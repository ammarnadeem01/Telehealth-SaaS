import User from "@models/User";
import { NextFunction, Request, Response } from "express";

export const restrict = async (
  req: Request,
  res: Response,
  next: NextFunction,
  roles: string[]
) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(404).json({
        status: "Fail",
        message: "User Id is requiered...",
      });
      return;
    }
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        status: "Fail",
        message: "User not found...",
      });
      return;
    }
    if (roles && roles.includes(user.role)) next();
    res.status(404).json({
      status: "Fail",
      message: "Sorry... You are not allowed to access this route.",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error,
    });
  }
};
