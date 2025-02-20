import express from "express";
const app = express();
import UserRouter from "@routes/user";
import cors from "cors";

// security checks
const corsOptions = {
  origin: ["https://localhost:5173.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1/users", UserRouter);
export default app;
