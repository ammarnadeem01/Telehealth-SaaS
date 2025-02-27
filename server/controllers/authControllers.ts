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
    }: IUser = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      !phoneNumber ||
      !address ||
      !timezone
    ) {
      res.status(400).json({
        status: "Fail",
        message: "Missing Required Fields.",
      });
      return;
    }
    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      res.status(400).json({
        status: "Fail",
        message: "User already exists.",
      });
      return;
    }
    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
      role,
      phoneNumber,
      address,
      timezone,
      profilePicture: `https://api.dicebear.com/6.x/initials/svg?seed=${name}`,
    });
    if (!user) {
      res.status(404).json({
        status: "Fail",
        message: "User not created. Please try again.",
      });
      return;
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.status(200).json({
      status: "Success",
      token: accessToken,
      data: user,
    });
    const message = `<p>Welcome <strong>${user.name}</strong>,</p>\n
    <p>Thank you for signing up for <strong>Telehealth</strong>!</p>\n
    <p>Your account was successfully created on <strong>${user.createdAt.toLocaleDateString()}</strong> at <strong>${user.createdAt.toLocaleTimeString()}</strong>.</p>\n
    <p>We're excited to have you on board.</p>\n
    <p>If you didn't sign up for this account, please contact our support team immediately.</p>\n
    <p>Best regards,<br><strong>Telehealth Team</strong></p>`;

    sendEmail(user.email, `Welcome to Telehealth, ${user.name}`, message);
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
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
