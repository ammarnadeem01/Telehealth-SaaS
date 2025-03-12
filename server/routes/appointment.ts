import express from "express";
import {
  bookAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  // getAvailableSlots,
} from "@controllers/appointmentControlller";

const router = express.Router();

router.post("/create-appointment", bookAppointment);
router.get("/get-appointment/:appointmentId", getAppointmentById);
router.get("/get-all-appointment", getAllAppointments);
router.patch("/update-appointment/:id", updateAppointment);
router.delete("/delete-appointment/:id", deleteAppointment);
export default router;
