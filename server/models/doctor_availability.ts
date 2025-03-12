import mongoose, { Schema } from "mongoose";
interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface IDoctorAvaiability {
  doctor: mongoose.Schema.Types.ObjectId;
  availableSlots: Map<string, TimeSlot[]>;
}

const doctorAvailabilitySchema: Schema<IDoctorAvaiability> = new Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    availableSlots: {
      type: Map,
      of: [
        {
          startTime: { type: String, required: true },
          endTime: { type: String, required: true },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DoctorAvailability = mongoose.model<IDoctorAvaiability>(
  "DoctorAvailability",
  doctorAvailabilitySchema
);
export default DoctorAvailability;
