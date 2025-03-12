// import express from "express";

// import { createMedicalRecord } from "@controllers/medical_records";
// const router = express.Router();
// router.post("/create-medical-record", createMedicalRecord);
// import { authenticateToken } from "middlewares/protect.middleware";
// router.post("/", authenticateToken, authorize(["doctor"]), createMedicalRecord);
// router.get("/:id", authenticateToken, getMedicalRecord);
// router.get("/patient/:patientId", authenticateToken, getPatientRecords);
// router.get("/doctor/:doctorId", authenticateToken, getDoctorRecords);
// router.delete(
//   "/:id",
//   authenticate,
//   authorize([Roles.DOCTOR]),
//   deleteMedicalRecord
// );
// router.patch(
//   "/:id",
//   authenticate,
//   authorize([Roles.DOCTOR]),
//   updateMedicalRecord
// );

// export default router;
