import express from "express";
import cors from "cors";

import db from "./config/db.js";

import audioRoutes from "./routes/audios.js";
import upload from "./config/multer.js";
import * as mm from "music-metadata";

const app = express();

app.use(cors());
app.use(express.json());

// get audios
app.use("/api/audios", audioRoutes);

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    mm.parseFile(req.file.path, { native: true })
      .then((metadata) => {
        const duration = metadata.format.duration;
        const getFilename = file.filename;
        return res.status(200).json({ getFilename, duration });
      })
      .catch((err) => {
        console.error(err.message);
      });

    // return res.status(200).json(file);
    // const file = req.file.path;
    // const conf = cloudinary.config({
    //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //   api_key: process.env.CLOUDINARY_API_KEY,
    //   api_secret: process.env.CLOUDINARY_API_SECRET,
    // });
    // await conf.uploader?.upload(file, {
    //   upload_preset: "audioReligious",
    // });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
