import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
enum UserRole {
  Patient = "patient",
  Doctor = "doctor",
  Admin = "admin",
}
export interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string | undefined;
  role: UserRole;
  phoneNumber: string;
  address: string;
  profilePicture: string;
  isActive: boolean;
  refreshToken: string | null;
  createdAt: Date;
  updatedAt: Date;
  resetToken: string;
  timezone: String;
  googleCalendarToken?: string;
  googleRefreshToken?: string;
  googleCalendarId?: string;
  feePerSlot: Number;
  about?: string;
  specialization?: string;
  comparePasswords: (passwd: string, comparePasswd: string) => {};
}
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password and Confirm Passwords don't match",
      },
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
    refreshToken: {
      type: String,
      select: false,
    },
    resetToken: {
      type: String,
    },
    timezone: {
      type: String,

      default: "UTC",
    },
    googleCalendarToken: {
      type: String,
    },
    about: {
      type: String,
      required: function () {
        return this.role === UserRole.Doctor;
      },
    },
    specialization: {
      type: String,
      required: function () {
        return this.role === UserRole.Doctor;
      },
    },
    feePerSlot: {
      type: Number,
      required: function () {
        return this.role === UserRole.Doctor;
      },
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.confirmPassword) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
  }
});
userSchema.methods.comparePasswords = async function (
  passwd: string,
  dbPasswd: string
) {
  return await bcrypt.compare(passwd, dbPasswd);
};
const User = mongoose.model<IUser>("User", userSchema);
export default User;
