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
  doctor: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  date: Date;
  status: AppointmentStatus;
  type: AppointmentType;
  notes?: string;
  paymentStatus: PaymentStatus;
  slots: Number;
}

const appointmentSchema: Schema<IAppointment> = new Schema(
  {
    name: {
      type: String,
      // required: true,
      maxlength: 100,
    },
    date: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.SCHEDULED,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    slots: {
      type: Number,
      required: true,
      // validate: {
      //   validator: (slots: string[]) =>
      //     slots.every((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time)),
      //   message: "Invalid time format in slots",
      // },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// appointmentSchema.virtual("startTime").get(function () {
//   return this.slots[0];
// });

// appointmentSchema.virtual("endTime").get(function () {
//   if (this.slots.length === 0) return null;
//   const lastSlot = this.slots[this.slots.length - 1];
//   const [hours, minutes] = lastSlot.split(":").map(Number);
//   return `${String(hours).padStart(
//     2,
//     "0"
//   )}:${String(minutes + 29).padStart(2, "0")}`;
// });

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema
);

export default Appointment;
