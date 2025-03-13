import User from "@models/User";
import { NextFunction, Request, Response } from "express";

export const restrict = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(1111111);
      console.log(req);
      const { patientId } = req.body;
      if (!patientId) {
        res.status(404).json({
          status: "Fail",
          message: "User ID is required...",
        });
        return;
      }
      console.log(1111111);
      const user = await User.findById(patientId);
      if (!user) {
        res.status(404).json({
          status: "Fail",
          message: "User not found...",
        });
        return;
      }
      console.log(1111111);
      if (roles.includes(user.role)) {
        next();
        return;
      }
      console.log(1111111);
      res.status(403).json({
        status: "Fail",
        message: "Sorry... You are not allowed to access this route.",
      });
    } catch (error: any) {
      res.status(500).json({
        status: "Fail",
        message: error.message || "Internal Server Error",
      });
    }
  };
};
