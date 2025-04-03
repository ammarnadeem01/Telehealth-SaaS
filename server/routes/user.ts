import { Router } from "express";
import {
  registerUser,
  loginUser,
  uploadImage,
  forogtPassword,
  resetPassword,
} from "@controllers/authControllers";
import { upload } from "middlewares/cloudinary.middleware";
import {
  getAllUsers,
  getAllDoctors,
  getAllPatients,
  getUser,
} from "@controllers/userControllers";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.get("/get-all-users", getAllUsers);
router.get("/get-all-doctors", getAllDoctors);
router.get("/get-all-patients", getAllPatients);
router.post("/upload", upload.single("image"), uploadImage);
router.post("/forgot-password", forogtPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/:id", getUser);
export default router;
