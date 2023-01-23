import express from "express";
import multer from "multer";
// import { upload } from "../config/multer.js";
import { createAudio, getAudio, getAudios } from "../controllers/audio.js";

const router = express.Router();

router.get("/", getAudios);
router.get("/:id", getAudio);
router.post("/", createAudio);
// router.post("/", multer().single("audio"), createAudio);
// router.post("/", upload.single("file"), createAudio);
// router.post("/", upload.single("file"), (req, res) => {
//   try {
//     const file = req.file;
//     console.log(file);
//     if (!file) return res.status(400).json({ message: "No file uploaded" });
//     return res.status(200).json(file.filename);
//   } catch (error) {
//     console.log(error);
//   }
// });

export default router;
