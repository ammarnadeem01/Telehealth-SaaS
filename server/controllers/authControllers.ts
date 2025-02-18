import jwt from "jsonwebtoken";
import User from "@models/User";
import { IUser } from "@models/User";
import { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose from "mongoose";
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
      profilePicture,
      isActive,
    }: IUser = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      !phoneNumber ||
      !address ||
      !profilePicture
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
      profilePicture,
      isActive,
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
    if (!user || !user.comparePasswords(password, user.password)) {
      res.status(400).json({
        status: "Fail",
        message: "Incorrect Email or Password...",
      });
      return;
    }

    if (!user) {
      res.status(404).json({
        status: "Fail",
        message: "Incorrect Email or Password.",
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
