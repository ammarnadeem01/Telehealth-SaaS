import express from "express";
const app = express();
import cors from "cors";
import hpp from "hpp"; // http paramter pollution
import rateLimit from "express-rate-limit"; // limited no of req
import sanitize from "express-mongo-sanitize"; // sanitize for hacker attacks- nosql query
// import xss from "xss"; // sanitize for hacker attacks- html
import helmet from "helmet"; //  security headers
import UserRouter from "@routes/user";
import AppointmentRouter from "@routes/appointment";
import DoctorAvaiabilityRouter from "@routes/doctor_availability";

// app.use(helmet());
// app.use(sanitize());
// let limtier = rateLimit({
//   max: 1, // 1 req per ip {fot testin purposes}
//   windowMs: 6000,
//   message:
//     "We have received too many requests from this ip. Please try again later.",
// });
// app.use("/api", limtier);
// app.use(xss());
// const corsOptions = {
//   origin: ["*"],
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true,
// };

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/appointment", AppointmentRouter);
app.use("/api/v1/doctorAvailability", DoctorAvaiabilityRouter);
export default app;
