const cloudinary = require("cloudinary").v2;
require("dotenv");
exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      // configure the cloudinary to upload files //
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (error) {
    console.log(error);
  }
};
