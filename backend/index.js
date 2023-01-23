import express from "express";
import cors from "cors";

import db from "./config/db.js";

import audioRoutes from "./routes/audios.js";
import { upload } from "./config/multer.js";

const app = express();

app.use(cors());
app.use(express.json());

// get audios
app.use("/api/audios", audioRoutes);

app.post("/", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    if (!file) return res.status(400).json({ message: "No file uploaded" });
    return res.status(200).json(file.filename);
  } catch (error) {
    console.log(error);
  }
});
// app.use("/api/uploads", express.static("uploads"));

// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "audio/mpeg" ||
//     file.mimetype === "audio/wave" ||
//     file.mimetype === "audio/wav" ||
//     file.mimetype === "audio/mp3"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
