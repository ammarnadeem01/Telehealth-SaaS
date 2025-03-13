import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const medicalRecordsDir = path.join(__dirname, "../../uploads/medical-records");

// Create directory if it doesn't exist
if (!fs.existsSync(medicalRecordsDir)) {
  fs.mkdirSync(medicalRecordsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, medicalRecordsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PDF, JPEG, and PNG are allowed."),
      false
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
  // limits: {
  //   fileSize: 1024 * 1024 * 10, // 10MB limit
  // },
});
