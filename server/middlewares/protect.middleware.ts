import { Request, Response, NextFunction } from "express";
import User from "@models/User";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { generateAccessToken } from "@controllers/authControllers";
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ message: "You are not logged in." });

  jwt.verify(token, process.env.ACCESS_SECRET_STR!, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    (req as any).user = user;
    next();
  });
};

export const regenerateAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(403).json({ message: "Refresh token not provided" });

  const user = await User.findOne({ refreshToken });
  if (!user)
    return res.status(403).json({ message: "Refresh token not valid" });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_STR!,
    (err: any, decoded: any) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });
      const accessToken = generateAccessToken(user._id);
      res.json({ accessToken });
    }
  );
};
