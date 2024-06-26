require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const {
  cloudinaryName,
  cloudinaryApiKey,
  cloudinaryApiSecret,
} = require("../../config/var");
cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});
module.exports = { cloudinary };
