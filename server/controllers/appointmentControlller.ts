import { Request, Response } from "express";
import Appointment from "@models/appointment";
import moment from "moment-timezone";
// import { addAppointmentToGoogleCalendar } from "../utils/googleCalendar";
import { createCalendarEvent } from "../utils/googleCalendar";

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const {
      name,
      participants,
      timezone,
      status,
      type,
      notes,
      paymentStatus,
      startTime,
      endTime,
    } = req.body;

    const localStartDateTime = moment.tz(`${startTime}`, timezone);
    const localEndDateTime = moment.tz(`${endTime}`, timezone);
    const utcStartDateTime = localStartDateTime.utc().toDate();
    const utcEndDateTime = localEndDateTime.utc().toDate();
    let newAppointment;
    try {
      newAppointment = await Appointment.create({
        name,
        participants,
        status,
        type,
        notes,
        paymentStatus,
        startTime: utcStartDateTime,
        endTime: utcEndDateTime,
      });
    } catch (error) {
      console.log(error);
    }
    const event = {
      notes,
      participants,
      timezone,
      startTime,
      endTime,
    };
    const googleEvent = await createCalendarEvent(event);
    console.log(22222);
    res.status(201).json({
      status: "Success",
      data: newAppointment,
      // googleEvent,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: "Error creating appointment",
      error,
    });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find().populate("participants");
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching appointments", error });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { userTimezone } = req.body;
    const appointment = await Appointment.findById(req.params.id).populate(
      "participants"
    );

    if (!appointment) {
      res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
      return;
    }
    const storedStartUTC = appointment.startTime;
    const storedEndUTC = appointment.endTime;
    const localStartTimeConverted = moment
      .utc(storedStartUTC)
      .tz(userTimezone)
      .format("YYYY-MM-DD HH:mm A");
    const localEndTimeConverted = moment
      .utc(storedEndUTC)
      .tz(userTimezone)
      .format("YYYY-MM-DD HH:mm A");

    res.status(200).json({
      success: true,
      data: appointment,
      localStartTimeConverted,
      localEndTimeConverted,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching appointment", error });
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
