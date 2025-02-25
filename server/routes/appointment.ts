import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "@controllers/appointmentControlller";

const router = express.Router();

router.post("/create-appointment", createAppointment);
router.get("/get-appointments", getAppointments);
router.get("/get-appointment/:id", getAppointmentById);
router.patch("/update-appointment/:id", updateAppointment);
router.delete("/delete-appointment/:id", deleteAppointment);

export default router;
