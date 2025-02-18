import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./app";
import mongoose from "mongoose";

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
  console.log("App started on port", 3000);
});
