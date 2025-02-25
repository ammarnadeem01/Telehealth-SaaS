import { Request, Response } from "express";
import Appointment from "@models/appointment";

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { name, participants, date, status, type, notes, paymentStatus } =
      req.body;

    const newAppointment = new Appointment({
      name,
      participants,
      date,
      status,
      type,
      notes,
      paymentStatus,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json({ success: true, data: savedAppointment });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating appointment", error });
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
    const appointment = await Appointment.findById(req.params.id).populate(
      "participants"
    );

    if (!appointment) {
      res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
      return;
    }

    res.status(200).json({ success: true, data: appointment });
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
