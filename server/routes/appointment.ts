import express from "express";
import {
  bookAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  // getAvailableSlots,
  getDoctorAppointments,
  getPatientAppointments,
} from "@controllers/appointmentControlller";

const router = express.Router();

router.post("/create-appointment", bookAppointment);
router.get("/get-appointment/:appointmentId", getAppointmentById);
router.get("/get-all-appointment", getAllAppointments);
router.patch("/update-appointment/:id", updateAppointment);
router.delete("/delete-appointment/:id", deleteAppointment);
router.delete("/get-doctor-appointments", getDoctorAppointments);
router.delete("/get-patient-appointments", getPatientAppointments);
export default router;
