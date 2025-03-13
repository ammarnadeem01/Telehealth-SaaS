import express from "express";
import { restrict } from "middlewares/restrict.middleware";
import {
  createMedicalRecord,
  deleteRecord,
  downloadReport,
  getPatientRecords,
  getSingleRecord,
  getUserRecords,
  updateMedicalRecord,
} from "@controllers/medical_records";
import { upload } from "../utils/fileStorage";

const router = express.Router();

// Routes
router
  .route("/create-medical-record")
  .post(
    upload.single("file"),
    restrict(["admin", "doctor", "patient"]),
    createMedicalRecord
  );
router.get("/patient/:patientId", getPatientRecords);
router.get("/:id", getSingleRecord);
router.get("/:id/download", downloadReport);
router.put(
  "/:id",
  restrict(["doctor", "admin"]),
  upload.single("file"),
  updateMedicalRecord
);
router.delete("/:id", restrict(["admin"]), deleteRecord);
router.get("/user/:userId", restrict(["doctor", "admin"]), getUserRecords);

export default router;
