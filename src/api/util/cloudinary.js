require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name:"civitas-community" ,
    api_key: "395356738248445",
    api_secret: "SmmpB88cU2z2frYp2D3RhzQnvHg",
});
module.exports = { cloudinary };
