import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import Stripe from "stripe";
import http from "http";
import hpp from "hpp"; // http paramter pollution
import rateLimit from "express-rate-limit"; // limited no of req
import sanitize from "express-mongo-sanitize"; // sanitize for hacker attacks- nosql query
// import xss from "xss"; // sanitize for hacker attacks- html
import helmet from "helmet"; //  security headers
import UserRouter from "@routes/user";
import AppointmentRouter from "@routes/appointment";
import DoctorAvaiabilityRouter from "@routes/doctor_availability";
import MedicalRecordsRouter from "@routes/medical_records";
import passport from "../server/services/passportConfig";
import jwt from "jsonwebtoken";
import { chatSocketHandler } from "./sockets/chat";
import { webrtcSocketHandler } from "./sockets/webrtc";
import { Server } from "socket.io";
import Appointment from "@models/appointment";
// app.use(helmet());
// app.use(sanitize());
// let limtier = rateLimit({
//   max: 1, // 1 req per ip {fot testin purposes}
//   windowMs: 6000,
//   message:
//     "We have received too many requests from this device. Please try again later.",
// });
// app.use("/api", limtier);
// app.use(xss());
// const corsOptions = {
//   origin: ["*"],
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true,
// };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use("/uploads", express.static("uploads"));

app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
  })
);
app.post("/create-payment-intent", async (req: any, res: any) => {
  try {
    const { appointmentId } = req.body;

    // Find appointment details
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: (appointment.amount as number) * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    const user = req.user as {
      id: string; // assuming you have an id to uniquely identify the user in your DB
      accessToken: string;
      refreshToken: string;
      profile: any;
      googleCalendarToken?: string;
      googleRefreshToken?: string;
      googleCalendarId?: string;
    };

    // Optionally, update the user record in your database to persist these tokens.
    // For example:
    // await updateUser(user.id, {
    //   googleCalendarToken: user.googleCalendarToken || user.accessToken,
    //   googleCalendarRefreshToken: user.googleRefreshToken || user.refreshToken,
    //   googleCalendarId: user.googleCalendarId || null,
    // });

    // Generate JWT Access Token (for client requests)
    const accessToken = jwt.sign(
      { profile: user.profile },
      process.env.ACCESS_SECRET_STR!,
      { expiresIn: "15m" }
    );

    // Generate JWT Refresh Token (for token renewal)
    const jwtRefreshToken = jwt.sign(
      { profile: user.profile },
      process.env.REFRESH_SECRET_STR!,
      { expiresIn: "7d" }
    );

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", jwtRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send access token & Google Calendar tokens in the response.
    res.json({
      accessToken,
      googleCalendarToken: user.googleCalendarToken || user.accessToken, // for Google Calendar API calls
      googleCalendarRefreshToken: user.googleRefreshToken || user.refreshToken,
      googleCalendarId: user.googleCalendarId || null,
    });
  }
);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// When a new socket connects, pass it to our handlers
io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id);
  chatSocketHandler(io, socket);
  webrtcSocketHandler(io, socket);
});
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/appointment", AppointmentRouter);
app.use("/api/v1/doctorAvailability", DoctorAvaiabilityRouter);
app.use("/api/v1/medicalRecords", MedicalRecordsRouter);
export default server;
