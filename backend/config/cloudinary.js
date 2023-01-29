import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const cloudinaryConf = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinaryConf.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};
export default uploads;
export { cloudinaryConf };
// export { cloudinary };
