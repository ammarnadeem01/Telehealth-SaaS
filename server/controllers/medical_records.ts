import DoctorAvailability from "@models/doctor_availability";
import MedicalReccord from "@models/medical_records";
import { Request, Response } from "express";

export const createMedicalRecord = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
