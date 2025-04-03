import DoctorAvailability from "@models/doctor_availability";
import User from "@models/User";
import { Request, Response } from "express";
import { format, parseISO, startOfDay, addDays, isBefore } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";
import Appointment, { IAppointment } from "@models/appointment";

export const createDoctorAvailability = async (req: Request, res: Response) => {
  try {
    const { doctorId, availability } = req.body;

    if (!doctorId || !availability) {
      res.status(400).json({ error: "doctorId and availability are required" });
      return;
    }

    const doc = await DoctorAvailability.findOneAndUpdate(
      { doctor: doctorId },
      { $set: { availableSlots: availability } },
      { upsert: true, new: true, runValidators: true }
    );

    if (!doc) {
      res.status(400).json({ error: "Please try again." });
      return;
    }

    res.status(200).json(doc);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// export const createDoctorAvailability = async (req: Request, res: Response) => {
//   try {
//     const { doctor, availableSlots } = req.body;
//     console.log(req.body);

//     if (!doctor || !availableSlots) {
//       res.status(400).json({
//         status: "fail",
//         message: "Id and avaiable slots are required fields.",
//       });
//       return;
//     }

//     const isExists = await User.find({ _id: doctor });
//     if (!isExists) {
//       res.status(404).json({
//         status: "fail",
//         message: "User not found.",
//       });
//       return;
//     }

//     console.log(4);
//     const doctorAvaiability = await DoctorAvaiability.create({
//       doctor,
//       availableSlots,
//     });
//     console.log(5);
//     if (!doctorAvaiability) {
//       res.status(404).json({
//         status: "fail",
//         message: "User not created due to some issue. Please try again.",
//       });
//       return;
//     }
//     console.log(6);
//     res.status(200).json({
//       status: "success",
//       data: doctorAvaiability,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//     });
//   }
// };
// export const updateDoctorAvaiability = async (req: Request, res: Response) => {
//   try {
//     const { doctor, availableSlots } = req.body;
//     console.log(1);
//     if (!doctor || !availableSlots) {
//       res.status(400).json({
//         status: "fail",
//         message: "Id and avaiable slots are required fields.",
//       });
//       return;
//     }
//     const isExists = await User.findOne({ _id: doctor });
//     if (!isExists) {
//       res.status(404).json({
//         status: "fail",
//         message: "User not found.",
//       });
//       return;
//     }
//     const user = await DoctorAvailability.findOneAndUpdate(
//       { doctor },
//       { availableSlots },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     if (!user) {
//       res.status(404).json({
//         status: "fail",
//         message: "Doctor not found.",
//       });
//       return;
//     }

//     res.status(201).json({
//       status: "success",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//     });
//   }
// };

interface TimeSlot {
  start: Date;
  end: Date;
}
export const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    // Validate input
    if (!doctorId || !date) {
      res.status(400).json({
        status: "fail",
        message: "Doctor ID and date are required",
      });
      return;
    }

    // Get doctor's timezone
    const doctor = await User.findById(doctorId);
    if (!doctor) {
      res.status(404).json({
        status: "fail",
        message: "Doctor not found",
      });
      return;
    }

    // Parse and validate date
    const selectedDate = parseISO(date.toString());
    if (isBefore(selectedDate, startOfDay(new Date()))) {
      res.status(400).json({
        status: "fail",
        message: "Cannot select past dates",
      });
      return;
    }

    // Get doctor's availability
    const availability = await DoctorAvailability.findOne({ doctor: doctorId });
    if (!availability) {
      res.status(404).json({
        status: "fail",
        message: "Availability not found for this doctor",
      });
      return;
    }

    // Convert to doctor's timezone and get day of week
    const zonedDate = toZonedTime(selectedDate, doctor.timezone as string);
    const dayOfWeek = format(zonedDate, "EEEE");

    // Get available slots for this day
    const daySlots = availability.availableSlots.get(dayOfWeek) || [];
    if (daySlots.length === 0) {
      res.json({
        status: "success",
        data: [],
      });
      return;
    }

    // Calculate UTC time boundaries for the day
    const startOfDayUTC = fromZonedTime(
      startOfDay(zonedDate),
      doctor.timezone as string
    );
    const endOfDayUTC = fromZonedTime(
      addDays(startOfDay(zonedDate), 1),
      doctor.timezone as string
    );

    // Get existing appointments
    const appointments = (await Appointment.find({
      doctor: doctorId,
      date: {
        $gte: startOfDayUTC,
        $lt: endOfDayUTC,
      },
      status: { $nin: ["cancelled", "rejected"] },
    }).lean()) as unknown as Array<IAppointment & { date: Date }>;

    // Convert available slots to UTC time ranges
    const availableSlots: TimeSlot[] = daySlots.map((slot) => {
      const start = fromZonedTime(
        parseISO(`${date}T${slot.startTime}`),
        doctor.timezone as string
      );
      const end = fromZonedTime(
        parseISO(`${date}T${slot.endTime}`),
        doctor.timezone as string
      );
      return { start, end };
    });

    // Convert appointments to occupied time ranges (using slots field)
    const bookedSlots: TimeSlot[] = appointments.map((app) => ({
      start: app.date,
      end: new Date(app.date.getTime() + (app as any).slots * 30 * 60 * 1000), // Each slot = 30 mins
    }));
    // Calculate free slots by checking 30-minute intervals
    const freeSlots: TimeSlot[] = [];

    availableSlots.forEach((slot) => {
      let currentTime = slot.start;

      while (currentTime < slot.end) {
        const slotEnd = new Date(currentTime.getTime() + 30 * 60 * 1000); // 30-minute slot

        // Check if this slot is available
        const isBooked = bookedSlots.some(
          (booked) => currentTime >= booked.start && slotEnd <= booked.end
        );

        if (!isBooked && slotEnd <= slot.end) {
          freeSlots.push({
            start: new Date(currentTime),
            end: new Date(slotEnd),
          });
        }

        currentTime = slotEnd; // Move to next 30-minute slot
      }
    });

    // Format response in doctor's local time
    const formattedSlots = freeSlots.map((slot) => ({
      start: format(
        toZonedTime(slot.start, doctor.timezone as string),
        "HH:mm"
      ),
      end: format(toZonedTime(slot.end, doctor.timezone as string), "HH:mm"),
    }));

    res.json({
      status: "success",
      data: formattedSlots,
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
// export const getAvailableSlots = async (req: Request, res: Response) => {
//   try {
//     const { doctorId } = req.params;
//     const { date } = req.query;

//     // Validate input
//     if (!doctorId || !date) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Doctor ID and date are required",
//       });
//     }

//     // Get doctor's timezone
//     const doctor = await User.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({
//         status: "fail",
//         message: "Doctor not found",
//       });
//     }

//     // Parse and validate date
//     const selectedDate = parseISO(date.toString());
//     if (isBefore(selectedDate, startOfDay(new Date()))) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Cannot select past dates",
//       });
//     }

//     // Get doctor's availability
//     const availability = await DoctorAvailability.findOne({ doctor: doctorId });
//     if (!availability) {
//       return res.status(404).json({
//         status: "fail",
//         message: "Availability not found for this doctor",
//       });
//     }

//     // Get day of week for selected date in doctor's timezone
//     const zonedDate = utcToZonedTime(selectedDate, doctor.timezone);
//     const dayOfWeek = format(zonedDate, "EEEE");

//     // Get available slots for this day
//     const daySlots = availability.availableSlots.get(dayOfWeek) || [];
//     if (daySlots.length === 0) {
//       return res.json({
//         status: "success",
//         data: [],
//       });
//     }

//     // Get existing appointments for this date
//     const startOfDayUTC = zonedTimeToUtc(
//       startOfDay(zonedDate),
//       doctor.timezone
//     );
//     const endOfDayUTC = zonedTimeToUtc(
//       addDays(startOfDay(zonedDate), 1),
//       doctor.timezone
//     );

//     const appointments = await Appointment.find({
//       doctor: doctorId,
//       date: {
//         $gte: startOfDayUTC,
//         $lt: endOfDayUTC,
//       },
//       status: { $nin: ["cancelled", "rejected"] },
//     });

//     // Convert slots to time ranges
//     const availableSlots: TimeSlot[] = daySlots.map((slot) => {
//       const start = zonedTimeToUtc(
//         parseISO(`${date}T${slot.startTime}`),
//         doctor.timezone
//       );
//       const end = zonedTimeToUtc(
//         parseISO(`${date}T${slot.endTime}`),
//         doctor.timezone
//       );
//       return { start, end };
//     });

//     // Convert appointments to time ranges
//     const bookedSlots: TimeSlot[] = appointments.map((app) => ({
//       start: app.startTime,
//       end: app.endTime,
//     }));

//     // Calculate free slots
//     const freeSlots = availableSlots.reduce((acc: TimeSlot[], slot) => {
//       let currentStart = slot.start;

//       bookedSlots.forEach((booked) => {
//         if (booked.start < slot.end && booked.end > slot.start) {
//           if (currentStart < booked.start) {
//             acc.push({
//               start: currentStart,
//               end: booked.start,
//             });
//           }
//           currentStart = booked.end;
//         }
//       });

//       if (currentStart < slot.end) {
//         acc.push({
//           start: currentStart,
//           end: slot.end,
//         });
//       }

//       return acc;
//     }, []);

//     // Format response
//     const formattedSlots = freeSlots.map((slot) => ({
//       start: format(utcToZonedTime(slot.start, doctor.timezone), "HH:mm"),
//       end: format(utcToZonedTime(slot.end, doctor.timezone), "HH:mm"),
//     }));

//     res.json({
//       status: "success",
//       data: formattedSlots,
//     });
//   } catch (error) {
//     console.error("Error fetching available slots:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//     });
//   }
// };
export const getDocAvailabilityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        status: "fail",
        message: "Id is a required field.",
      });
      return;
    }
    const avaiabilityOfDoctor = await DoctorAvailability.find({
      doctor: id,
    });

    if (!avaiabilityOfDoctor) {
      res.status(404).json({
        status: "fail",
        message: "Doctor not found.",
      });
      return;
    }

    res.status(201).json({
      status: "success",
      data: avaiabilityOfDoctor,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
export const deleteDocAvailabilityById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        status: "fail",
        message: "Id is a required field.",
      });
    }
    const avaiabilityOfDoctor = await DoctorAvailability.findById({
      doctor: id,
    }).populate("doctor");

    if (!avaiabilityOfDoctor) {
      res.status(404).json({
        status: "fail",
        message: "Doctor not found.",
      });
    }

    res.status(201).json({
      status: "success",
      data: avaiabilityOfDoctor,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
