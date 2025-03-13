import { NextFunction, Request, Response } from "express";
import Appointment from "@models/appointment";
import moment from "moment-timezone";
// import { addAppointmentToGoogleCalendar } from "../utils/googleCalendar";
import { createCalendarEvent } from "../utils/googleCalendar";
import DoctorAvailability from "@models/doctor_availability";
import { google } from "googleapis";
import User, { IUser } from "@models/User";
import { GaxiosResponse } from "gaxios";
import { calendar_v3 } from "googleapis";

async function addEventToGoogleCalendar(
  calendarToken: any,
  event: calendar_v3.Schema$Event // Ensure proper typing
): Promise<calendar_v3.Schema$Event | undefined> {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  oAuth2Client.setCredentials(calendarToken);

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  // Fixing the type of the response
  const response: GaxiosResponse<calendar_v3.Schema$Event> =
    await calendar.events.insert({
      calendarId: "primary",
      requestBody: event, // Correct property name instead of 'resource'
    });

  return response.data; // Ensuring response data access is correctly typed
}

export const bookAppointment = async (req: Request, res: Response) => {
  try {
    const { doctor, patient, date, type, duration } = req.body;

    if (!doctor || !patient || !date || !type || !duration) {
      res.status(400).json({ message: "Missing required fields." });
      return;
    }

    if (duration % 30 !== 0) {
      res
        .status(400)
        .json({ message: "Duration must be in 30-minute increments." });
      return;
    }

    // Fetch patient and doctor details
    const patientObj = await User.findById(patient);
    const doctorObj = await User.findById(doctor);

    if (!patientObj || !doctorObj) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userTimezone = patientObj.timezone; // e.g., "Asia/Karachi"
    const doctorTimezone = doctorObj.timezone; // e.g., "America/New_York"

    // Convert user's local time to UTC
    const utcDate = moment
      .tz(date, userTimezone as string)
      .utc()
      .toISOString();

    // Get doctor’s availability
    const availability = await DoctorAvailability.findOne({ doctor });

    if (!availability) {
      res.status(404).json({ message: "Doctor availability not found" });
      return;
    }

    // Get the weekday (Monday, Tuesday, etc.)
    const dayOfWeek = moment(utcDate)
      .tz(doctorTimezone as string)
      .format("dddd");
    const availableSlots = availability.availableSlots.get(dayOfWeek);

    if (!availableSlots) {
      res.status(400).json({ message: `No available slots for ${dayOfWeek}` });
      return;
    }

    const appointmentStartTime = moment(utcDate)
      .tz(doctorTimezone as string)
      .format("HH:mm");

    const isSlotAvailable = availableSlots.some((slot: any) => {
      const startTime = new Date(`1970-01-01T${slot.startTime}:00Z`);
      const endTime = new Date(`1970-01-01T${slot.endTime}:00Z`);

      const appointmentStart = new Date(
        `1970-01-01T${appointmentStartTime}:00Z`
      );

      // Add duration in minutes
      const appointmentEnd = new Date(
        appointmentStart.getTime() + duration * 60000
      );

      return appointmentStart >= startTime && appointmentEnd <= endTime;
    });

    if (!isSlotAvailable) {
      res.status(400).json({ message: "Selected time slot is unavailable." });
      return;
    }
    const appointmentStartUTC = moment
      .tz(date, userTimezone as string)
      .utc()
      .toDate();

    const durationMs = duration * 60 * 1000; // Convert duration to milliseconds
    const appointmentEndUTC = new Date(
      appointmentStartUTC.getTime() + durationMs
    );

    // Check for overlapping appointments
    const conflictingAppointment = await Appointment.findOne({
      doctor,
      $expr: {
        $and: [
          { $lt: ["$date", appointmentEndUTC] },
          {
            $gt: [
              { $add: ["$date", { $multiply: ["$slots", 30 * 60 * 1000] }] },
              appointmentStartUTC,
            ],
          },
        ],
      },
    });

    if (conflictingAppointment) {
      res.status(400).json({ message: "Conflicting appointment exists." });
      return;
    }
    // Create appointment
    const appointment = await Appointment.create({
      doctor,
      patient,
      date: appointmentStartUTC,
      type,
      slots: duration / 30,
    });
    // Prepare event details for Google Calendar.
    // Note: Adjust the summary/description as needed.
    const patientEvent = {
      summary: `Appointment with Dr. ${doctorObj.name || "Doctor"}`,
      description: `Appointment type: ${type}`,
      start: {
        dateTime: appointmentStartUTC.toISOString(),
        timeZone: patientObj.timezone.toString(),
      },
      end: {
        dateTime: appointmentEndUTC.toISOString(),
        timeZone: patientObj.timezone.toString(),
      },
    };

    const doctorEvent = {
      summary: `Appointment with ${patientObj.name || "Patient"}`,
      description: `Appointment type: ${type}`,
      start: {
        dateTime: appointmentStartUTC.toISOString(),
        timeZone: doctorObj.timezone.toString(),
      },
      end: {
        dateTime: appointmentEndUTC.toISOString(),
        timeZone: doctorObj.timezone.toString(),
      },
    };

    // Add events to Google Calendar for both patient and doctor.
    // These calls assume that each user object has a valid googleCalendarToken.
    // They are wrapped in try/catch blocks so that a failure to add an event won't block the appointment booking.
    try {
      if (patientObj.googleCalendarToken) {
        await addEventToGoogleCalendar(
          patientObj.googleCalendarToken,
          patientEvent
        );
      }
    } catch (err) {
      console.error("Error adding event to patient calendar", err);
    }

    try {
      if (doctorObj.googleCalendarToken) {
        await addEventToGoogleCalendar(
          doctorObj.googleCalendarToken,
          doctorEvent
        );
      }
    } catch (err) {
      console.error("Error adding event to doctor calendar", err);
    }
    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const generateSlots = (start: string, end: string): string[] => {
  const slots: string[] = [];
  let current = parseTime(start);
  const endTime = parseTime(end);

  while (current < endTime) {
    slots.push(formatMinutesToTime(current));
    current += 30;
  }
  return slots;
};
const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};
const formatMinutesToTime = (minutes: number): string => {
  return `${Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}`;
};
// export const getAvailableSlots = async (
//   doctorId: string,
//   date: Date,
//   duration: number
// ) => {
//   const day = date.toLocaleDateString("en-US", { weekday: "long" });

//   // Get doctor availability
//   const availability = await DoctorAvailability.findOne({ doctor: doctorId });
//   const timeSlots = availability?.availableSlots.get(day) || [];

//   // Generate all possible slots
//   const allSlots = timeSlots.flatMap((ts) =>
//     generateSlots(ts.startTime, ts.endTime)
//   );

//   // Get existing appointments
//   const appointments = await Appointment.find({
//     doctor: doctorId,
//     date: { $eq: date },
//   });

//   const bookedSlots = new Set(appointments.flatMap((a) => a.slots));

//   // Find available slot sequences
//   const requiredSlots = duration / 30;
//   const available = [];

//   for (let i = 0; i <= allSlots.length - requiredSlots; i++) {
//     const sequence = allSlots.slice(i, i + requiredSlots);

//     if (sequence.every((s) => !bookedSlots.has(s))) {
//       available.push({
//         start: sequence[0],
//         end: formatMinutesToTime(parseTime(sequence[0]) + duration),
//         slots: sequence,
//       });
//     }
//   }

//   return available;
// };
export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching appointments", error });
  }
};
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ message: "Missing userId in query" });
      return;
    }

    const appointment = await Appointment.findById(appointmentId)
      .populate("doctor")
      .populate("patient");

    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const timezone = user.timezone || "UTC";

    // Create moment objects in the user's timezone
    const localStart = moment(appointment.date).tz(timezone as string);
    const localEnd = localStart
      .clone()
      .add(Number(appointment.slots) * 30, "minutes");

    res.status(200).json({
      appointment,
      localStart: localStart.format(), // ISO string with offset
      localEnd: localEnd.format(),
      slots: appointment.slots,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getDoctorAppointments = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ message: "Missing userId in query" });
      return;
    }

    // Verify doctor exists and get timezone
    const doctor = await User.findById(userId);
    if (!doctor || doctor.role !== "doctor") {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }

    // Get all appointments for this doctor
    const appointments = await Appointment.find({ doctor: userId })
      .populate("doctor")
      .populate("patient");

    // Convert to doctor's timezone
    const timezone = doctor.timezone || "UTC";
    const converted = appointments.map((app: any) => {
      const start = moment(app.date).tz(timezone as string);
      const end = start.clone().add(app.slots * 30, "minutes");

      return {
        ...app.toObject(),
        localStart: start.format(),
        localEnd: end.format(),
        timezone,
        duration: app.slots * 30,
      };
    });

    res.status(200).json(converted);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getPatientAppointments = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ message: "Missing userId in query" });
      return;
    }

    // Verify patient exists and get timezone
    const patient = await User.findById(userId);
    if (!patient || patient.role !== "patient") {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    // Get all appointments for this patient
    const appointments = await Appointment.find({ patient: userId })
      .populate("doctor")
      .populate("patient");

    // Convert to patient's timezone
    const timezone = patient.timezone || "UTC";
    const converted = appointments.map((app: any) => {
      const start = moment(app.date).tz(timezone as string);
      const end = start.clone().add(app.slots * 30, "minutes");

      return {
        ...app.toObject(),
        localStart: start.format(),
        localEnd: end.format(),
        timezone,
        duration: app.slots * 30,
      };
    });

    res.status(200).json(converted);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAppointment) {
      res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
      return;
    }
    res.status(200).json({ success: true, data: updatedAppointment });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating appointment", error });
  }
};
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );

    if (!deletedAppointment) {
      res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting appointment", error });
  }
};
