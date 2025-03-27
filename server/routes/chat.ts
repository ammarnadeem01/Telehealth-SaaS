// backend/routes/chatRoutes.ts
import { Router } from "express";
import {
  createChat,
  getDoctorChats,
  getPatientChats,
} from "../controllers/chatController";

const router = Router();

router.post("/", createChat);
router.get("/doctor/:doctorId", getDoctorChats);
router.get("/patient/:patientId", getPatientChats);

export default router;
