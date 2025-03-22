import User from "@models/User";
import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import APIFeatures from "services/API_Features";

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid user ID format",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid user ID format",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: "Id is required.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({ role: "doctor" });

    res.status(200).json({
      status: "success",
      data: {
        user: users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
export const getAllPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const features = new APIFeatures(User.find({ role: "patient" }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const users = await features.getQuery();

    res.status(200).json({
      status: "success",
      data: {
        user: users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      status: "success",
      data: {
        user: users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
