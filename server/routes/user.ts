import { Router } from "express";
import {
  registerUser,
  loginUser,
  uploadImage,
} from "@controllers/authControllers";
import { upload } from "middlewares/cloudinary.middleware";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post("/upload", upload.single("image"), uploadImage);
export default router;
