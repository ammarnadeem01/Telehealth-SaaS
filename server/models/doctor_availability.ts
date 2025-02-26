import mongoose, { Schema } from "mongoose";
interface TimeSlot {
  startTime: string;
  endTime: string;
}
interface AvailableSlot {
  day: string;
  slots: TimeSlot[];
}
interface IDoctorAvaiability {
  doctor: mongoose.Schema.Types.ObjectId;
  availableSlots: AvailableSlot[];
}

const doctorAvailabilitySchema: Schema<IDoctorAvaiability> = new Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  availableSlots: [
    {
      day: { type: String, required: true },
      slots: [
        {
          startTime: { type: String, required: true },
          endTime: { type: String, required: true },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("DoctorAvailability", doctorAvailabilitySchema);

const DoctorAvaiability = mongoose.model<IDoctorAvaiability>(
  "DoctorAvaiability",
  doctorAvailabilitySchema
);
export default DoctorAvaiability;
