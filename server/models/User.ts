import mongoose, { Schema } from "mongoose";

enum UserRole {
  Patient = "patient",
  Doctor = "doctor",
  Admin = "admin",
}
interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  phoneNumber: string;
  address: string;
  profilePicture: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [UserRole.Patient, UserRole.Doctor, UserRole.Admin],
      required: true,
      default: UserRole.Patient,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
