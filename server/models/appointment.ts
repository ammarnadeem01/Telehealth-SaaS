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
  amount: Number;
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
      default: AppointmentType.VIDEO,
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
    amount: {
      type: Number, // Add the amount field
      default: 0, // Optional: Set a default value
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

appointmentSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("slots") || this.isModified("doctor")) {
    const doctor = await mongoose.model("User").findById(this.doctor);
    if (!doctor || !doctor.feePerSlot) {
      return next(new Error("Doctor's fee per slot is missing"));
    }
    this.amount = doctor.feePerSlot * (this.slots as number);
  }
  next();
});

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema
);

export default Appointment;
