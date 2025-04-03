import jwt from "jsonwebtoken";
import User from "@models/User";
import { IUser } from "@models/User";
import { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose from "mongoose";
import { uploadToCloudinary } from "middlewares/cloudinary.middleware";
import { sendEmail } from "utils/SendMail";
import crypto from "crypto";

interface UserBody {
  email: string;
  password: string;
}
export function generateAccessToken(userId: mongoose.Types.ObjectId): string {
  const token: string = jwt.sign(
    {
      userId,
    },
    process.env.ACCESS_SECRET_STR!,
    { expiresIn: "1h" }
  );
  return token;
}

export function generateRefreshToken(userId: mongoose.Types.ObjectId): string {
  const token: string = jwt.sign(
    {
      userId,
    },
    process.env.REFRESH_SECRET_STR!,
    { expiresIn: "30d" }
  );
  return token;
}
export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      phoneNumber,
      address,
      timezone,
      about,
      specialization,
    }: IUser = req.body;

    // Common required fields for all roles
    const commonRequiredFields = [
      name,
      email,
      password,
      confirmPassword,
      role,
      phoneNumber,
      address,
      timezone,
    ];

    // Check for common required fields
    if (commonRequiredFields.some((field) => !field)) {
      res.status(400).json({
        status: "Fail",
        message: "Missing required fields",
      });
      return;
    }

    // Additional checks for doctors
    if (role === "doctor") {
      if (!about || !specialization) {
        res.status(400).json({
          status: "Fail",
          message: "Doctors require about and specialization fields",
        });
        return;
      }
    }

    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      res.status(400).json({
        status: "Fail",
        message: "User already exists",
      });
      return;
    }

    // Create user object based on role
    const userData: any = {
      name,
      email,
      password,
      confirmPassword,
      role,
      phoneNumber,
      address,
      timezone,
      profilePicture: `https://api.dicebear.com/6.x/initials/svg?seed=${name}`,
    };

    // Add doctor-specific fields
    if (role === "doctor") {
      userData.about = about;
      userData.specialization = specialization;
      userData.feePerSlot = req.body.feePerSlot || 100; // Default fee if not provided
    }

    const user = await User.create(userData);

    if (!user) {
      res.status(500).json({
        status: "Fail",
        message: "User creation failed",
      });
      return;
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Update user with refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookie and send response
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      status: "Success",
      token: accessToken,
      data: user,
    });

    // Send welcome email
    const message = `<p>Welcome <strong>${user.name}</strong>,</p>
      <p>Thank you for signing up as a <strong>${role}</strong> on <strong>Telehealth</strong>!</p>
      <p>Your account was created on ${user.createdAt.toLocaleDateString()} at ${user.createdAt.toLocaleTimeString()}.</p>
      ${
        role === "doctor" ? `<p>Your specialization: ${specialization}</p>` : ""
      }
      <p>Best regards,<br><strong>Telehealth Team</strong></p>`;

    await sendEmail(user.email, `Welcome to Telehealth, ${user.name}`, message);
  } catch (error: any) {
    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (val: any) => val.message
      );
      res.status(400).json({
        status: "Fail",
        message: messages.join(", "),
      });
      return;
    }

    res.status(500).json({
      status: "Fail",
      message: error.message || "Internal server error",
    });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: UserBody = req.body;
    if (!email || !password) {
      res.status(400).json({
        status: "Fail",
        message: "Email and Password are required.",
      });
      return;
    }
    const user = await User.findOne({ email }).select("+password");
    console.log("loginUser", user);
    const isMatch = await user?.comparePasswords(password, user.password);
    if (!user || !isMatch) {
      res.status(400).json({
        status: "Fail",
        message: "Incorrect Email or Password...",
      });
      return;
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();
    res.status(200).json({
      status: "Success",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });

    const user = await User.findById(req.body.userId);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.status(200).json({
      status: "Success",
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Something went wrong while logging out.",
    });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const result: any = await uploadToCloudinary(req?.file?.buffer);
    console.log("result", result);
    let avatarUrl = result.secure_url;

    res.status(200).json({
      status: "Success",
      data: avatarUrl,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

const generateResetToken = () => {
  return crypto.randomBytes(100).toString("hex");
};
const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const forogtPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        status: "Fail",
        message: "Email is required field.",
      });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        status: "Fail",
        message: "No User Found...",
      });
      return;
    }
    const token = generateResetToken();
    const hashedToken = hashToken(token);
    user.resetToken = hashedToken;
    await user.save();
    const resetURL = `http://localhost:5173/reset-password/${token}`;
    const message = `<p>Hello <strong>${user.name}</strong>,</p>\n<p>We noticed a forogt password request from your account for Telehealth app. Please click on the link below to reset your password.</p>\n${resetURL}\n<p>Stay secure,<br><strong>Telehealth Team</strong></p>`;
    await sendEmail(user.email, "Reset Password Request", message);
    res.status(200).json({
      status: "Success",
      message: "Email Sent",
      resetToken: token,
      dbtoken: hashedToken,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      res.status(400).json({
        status: "Fail",
        message: "Password and confirm Password are required fields.",
      });
      return;
    }
    const encryptedToken = hashToken(token);
    const user = await User.findOne({
      resetToken: encryptedToken,
    });
    if (!user) {
      res.status(404).json({
        status: "Fail",
        message: "No User Found. Token is valid.",
      });
      return;
    }
    user.password = password;
    user.confirmPassword = confirmPassword;
    await user.save();
    res.status(200).json({
      status: "Success",
      message: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};
