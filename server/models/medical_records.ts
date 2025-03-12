import mongoose, { Schema, Document } from "mongoose";

interface IMedicalRecord extends Document {
  userId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  file: string;
  date: Date;
  title: string;
  description: string;
}

const MedicalRecordSchema = new Schema<IMedicalRecord>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    file: { type: String, required: true },
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
