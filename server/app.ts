import express from "express";
const app = express();
import UserRouter from "@routes/user";
import cors from "cors";
app.use(cors());
app.use(express.json());
app.use("/api/v1/users", UserRouter);
export default app;
