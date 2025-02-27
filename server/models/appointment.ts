import mongoose, { Schema, Document } from "mongoose";

export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export enum AppointmentType {
  VIDEO = "video",
  AUDIO = "audio",
  IN_PERSON = "in-person",
}
export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
}

export interface IAppointment {
  name: String;
  participants: mongoose.Types.ObjectId[];
  date: Date;
  status: AppointmentStatus;
  type: AppointmentType;
  notes?: string;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  dateTime: string;
}

const appointmentSchema: Schema<IAppointment> = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.SCHEDULED,
    },
    type: {
      type: String,
      enum: Object.values(AppointmentType),
      required: true,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    dateTime: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema
);

export default Appointment;
