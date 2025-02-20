import streamifier from "streamifier";
import multer from "multer";
import cloudinary from "../utils/cloudinary";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const uploadToCloudinary = async (fileBuffer: any) => {
  return new Promise((resolve, reject) => {
    console.log(fileBuffer);
    if (!fileBuffer) {
      return reject(new Error("File buffer is missing."));
    }
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "telehealth" },
      (error: any, result: any) => {
        if (result) resolve(result);
        else {
          console.log(error);
          reject(error);
        }
      }
    );
    console.log("uploadStream", uploadStream);
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export { upload, uploadToCloudinary };
