import DoctorAvailability from "@models/doctor_availability";
import User from "@models/User";
import { NextFunction, Request, Response } from "express";
import mongoose, { isValidObjectId } from "mongoose";
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
    const doctorQuery = User.find({ role: "doctor" });
    console.log("req.query", req.query);
    // Apply search, filtering, sorting, field limiting, pagination, etc.
    const features = new APIFeatures<any>(doctorQuery, req.query).search(); // if a "search" parameter is provided
    // .filter() // applies basic filtering excluding reserved fields
    // .filterByDays() // custom filter for available days
    // .filterByDuration(); // custom filter based on available slot duration
    // .sort() // sort by provided query parameter or default
    // .limitFields() // limit returned fields if requested
    // .paginate(); // support pagination via query string
    // Execute the query to get doctor documents.
    const doctors = await features.getQuery();
    // const doctors = await features;

    // Retrieve availability info for all returned doctors.
    const doctorIds = doctors.map((doc: any) => doc._id);
    const availabilities = await DoctorAvailability.find({
      doctor: { $in: doctorIds },
    });

    // Build a lookup map for availability keyed by doctor id.
    const availabilityMap: { [key: string]: any } = {};
    availabilities.forEach((availability) => {
      // availability.availableSlots is a Map (or object) as defined in your schema
      availabilityMap[availability.doctor.toString()] =
        availability.availableSlots;
    });

    // Combine each doctor's data with their availability.
    const doctorsWithAvailability = doctors.map((doctor: any) => {
      return {
        ...doctor.toObject(),
        availableSlots: availabilityMap[doctor._id.toString()] || {},
      };
    });

    res.status(200).json({
      status: "success",
      results: doctorsWithAvailability.length,
      data: {
        doctors: doctorsWithAvailability,
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
    const users = await User.find({ role: "patient" });

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
