import { Router } from "express";
import {
  registerUser,
  loginUser,
  uploadImage,
  forogtPassword,
  resetPassword,
} from "@controllers/authControllers";
import { upload } from "middlewares/cloudinary.middleware";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post("/upload", upload.single("image"), uploadImage);
router.post("/forgot-password", forogtPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
