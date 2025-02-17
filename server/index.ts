import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const app = express();
const connStr: string = process.env.CONNECTION_STRING!;
mongoose
  .connect(connStr)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.log("Database Connection Error");
  });
app.listen(3000, () => {
  console.log("first");
});
