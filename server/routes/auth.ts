import express, { Request, Response } from "express";
// import { oAuth2Client } from "../utils/googleAuth";
import { IUser } from "@models/User";
// Import user model
import User from "@models/User";
import { google } from "googleapis";
import passport from "passport";
const router = express.Router();
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
import jwt from "jsonwebtoken";
// Step 1: Redirect user to Google for authentication
router.get("/google", (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });
  res.redirect(url);
});

// Step 2: Handle callback after authentication
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req: Request & { user?: any }, res: Response) => {
    if (!req.user) {
      res.status(401).json({ message: "Authentication failed" }); // Do not return
      return; // Early return to stop further execution
    }

    const user = req.user as {
      accessToken: string;
      refreshToken: string;
      profile: any;
    };

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { profile: user.profile },
      process.env.ACCESS_SECRET_STR!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { profile: user.profile },
      process.env.REFRESH_SECRET_STR!,
      { expiresIn: "7d" }
    );

    // Set refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send tokens to frontend
    res.json({
      accessToken,
      googleToken: user.accessToken, // For Google Calendar API
    }); // Do not return
  }
);

export default router;
