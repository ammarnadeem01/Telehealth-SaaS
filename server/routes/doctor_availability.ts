import express from "express";
import {
  createDoctorAvailability,
  getDocAvailabilityById,
  deleteDocAvailabilityById,
} from "@controllers/doctorAvailability";

const router = express.Router();
router.post("/create-doctor-availability", createDoctorAvailability);
router.patch("/edit-doctor-availability", createDoctorAvailability);
router.get("/get-doctor-availability/:id", getDocAvailabilityById);
router.delete("/delete-doctor-availability/:id", deleteDocAvailabilityById);
export default router;
