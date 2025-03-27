import MedicalRecord from "@models/medical_records";
import User from "@models/User";
import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import fs from "fs";

export async function createMedicalRecord(req: Request, res: Response) {
  try {
    console.log("req", req);
    const { doctorId, patientId, title, description } = req.body;
    console.log("req.file", req.file);

    if (!patientId || !title || !description || !req.file) {
      res.status(400).json({ error: "Missing required fields yayy" });
      return;
    }
    if (!isValidObjectId(patientId)) {
      res.status(400).json({ error: "Invalid patient ID" });
      return;
    }
    const patient = await User.findById(patientId);
    if (!patient || patient.role !== "patient") {
      res.status(404).json({ error: "Patient not found" });
      return;
    }
    const newRecord = new MedicalRecord({
      doctorId,
      patientId,
      title,
      description,
      filePath: req.file.path,
      fileName: req.file.originalname,
    });
    await newRecord.save();
    await newRecord.populate(["doctorId", "patientId"]);
    res.status(201).json({
      status: "Success",
      data: newRecord,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPatientRecords(req: Request, res: Response) {
  try {
    const { patientId } = req.params;

    if (req.body.role === "patient" && req.body.id !== patientId) {
      res.status(403).json({ error: "Unauthorized access" });
      return;
    }

    const records = await MedicalRecord.find({ patientId })
      .populate("doctorId", "name role")
      .populate("patientId", "name email");

    res.json(records);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getSingleRecord(req: Request, res: Response) {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate("userId", "name role")
      .populate("patientId", "name email");

    if (!record) {
      res.status(404).json({ error: "Record not found" });
      return;
    }

    if (
      req.body.role === "patient" &&
      record.patientId.toString() !== req.body.id
    ) {
      res.status(403).json({ error: "Unauthorized access" });
      return;
    }

    res.json(record);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function downloadReport(req: Request, res: Response) {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) {
      res.status(404).json({ error: "Record not found" });
      return;
    }

    if (
      req.body.role === "patient" &&
      record.patientId.toString() !== req.body.id
    ) {
      res.status(403).json({ error: "Unauthorized access" });
      return;
    }

    console.log("record", record);
    if (!fs.existsSync(record.filePath)) {
      res.status(404).json({ error: "File not found" });
    } else res.download(record.filePath);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateMedicalRecord(req: Request, res: Response) {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) {
      res.status(404).json({ error: "Record not found" });
      return;
    }

    // if (req.body.role !== "admin" && record.userId.toString() !== req.body.id) {
    //   res.status(403).json({ error: "Unauthorized access" });
    //   return;
    // }

    if (req.file) {
      if (fs.existsSync(record.filePath)) {
        fs.unlinkSync(record.filePath);
      }
      record.filePath = req.file.path;
      // record.fileName = req.file.originalname;
    }

    if (req.body.title) record.title = req.body.title;
    if (req.body.description) record.description = req.body.description;

    const updatedRecord = await record.save();
    res.json(await updatedRecord.populate(["userId", "patientId"]));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteRecord(req: Request, res: Response) {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) {
      res.status(404).json({ error: "Record not found" });
      return;
    }

    if (req.body.role !== "admin") {
      res.status(403).json({ error: "Unauthorized access" });
      return;
    }

    if (fs.existsSync(record.filePath)) {
      fs.unlinkSync(record.filePath);
    }

    await MedicalRecord.deleteOne({ _id: req.params.id });
    res.json({ message: "Record deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserRecords(req: Request, res: Response) {
  try {
    // if (req.body.role !== "admin" && req.params.userId !== req.body.id) {
    //   res.status(403).json({ error: "Unauthorized access" });
    //   return;
    // }

    const records = await MedicalRecord.find({
      patientId: req.query.patientId,
    }).populate("patientId", "name email");

    res.json(records);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
