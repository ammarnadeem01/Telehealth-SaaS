import mongoose, { Schema, Document } from "mongoose";

interface IMedicalRecord extends Document {
  doctorId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  filePath: string;
  fileName: string;
  date: Date;
  title: string;
  description: string;
}

const MedicalRecordSchema = new Schema<IMedicalRecord>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    filePath: { type: String, required: true },
    fileName: { type: String, required: true },
    date: { type: Date, default: Date.now },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const MedicalRecord = mongoose.model<IMedicalRecord>(
  "MedicalRecord",
  MedicalRecordSchema
);

export default MedicalRecord;
