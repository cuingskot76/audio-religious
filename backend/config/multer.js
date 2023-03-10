import multer from "multer";
import path from "path";

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
    // cb(null, "../frontend/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

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

const upload = multer({ storage: storage });

export default upload;
