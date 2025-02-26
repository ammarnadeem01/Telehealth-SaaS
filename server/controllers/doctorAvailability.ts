import DoctorAvaiability from "@models/doctor_availability";
import User from "@models/User";
import { Request, Response } from "express";

export const createDoctorAvailability = async (req: Request, res: Response) => {
  try {
    const { doctor, availableSlots } = req.body;
    console.log(req.body);

    if (!doctor || !availableSlots) {
      res.status(400).json({
        status: "fail",
        message: "Id and avaiable slots are required fields.",
      });
      return;
    }

    const isExists = await User.find({ _id: doctor });
    if (!isExists) {
      res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
      return;
    }

    console.log(4);
    const doctorAvaiability = await DoctorAvaiability.create({
      doctor,
      availableSlots,
    });
    console.log(5);
    if (!doctorAvaiability) {
      res.status(404).json({
        status: "fail",
        message: "User not created due to some issue. Please try again.",
      });
      return;
    }
    console.log(6);
    res.status(200).json({
      status: "success",
      data: doctorAvaiability,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
export const updateDoctorAvaiability = async (req: Request, res: Response) => {
  try {
    const { doctor, availableSlots } = req.body;
    console.log(1);
    if (!doctor || !availableSlots) {
      res.status(400).json({
        status: "fail",
        message: "Id and avaiable slots are required fields.",
      });
      return;
    }
    const isExists = await User.findOne({ _id: doctor });
    if (!isExists) {
      res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
      return;
    }
    const user = await DoctorAvaiability.findOneAndUpdate(
      { doctor },
      { availableSlots },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "Doctor not found.",
      });
      return;
    }

    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getDocAvailabilityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        status: "fail",
        message: "Id is a required field.",
      });
      return;
    }
    const avaiabilityOfDoctor = await DoctorAvaiability.find({
      doctor: id,
    });

    if (!avaiabilityOfDoctor) {
      res.status(404).json({
        status: "fail",
        message: "Doctor not found.",
      });
      return;
    }

    res.status(201).json({
      status: "success",
      data: avaiabilityOfDoctor,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
export const deleteDocAvailabilityById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        status: "fail",
        message: "Id is a required field.",
      });
    }
    const avaiabilityOfDoctor = await DoctorAvaiability.findById({
      doctor: id,
    }).populate("doctor");

    if (!avaiabilityOfDoctor) {
      res.status(404).json({
        status: "fail",
        message: "Doctor not found.",
      });
    }

    res.status(201).json({
      status: "success",
      data: avaiabilityOfDoctor,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
