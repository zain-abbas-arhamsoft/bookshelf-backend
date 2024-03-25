require("dotenv").config();
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI,
    mongoUri: process.env.ONLINE_MONGO_URI,
  },
  bypassedRoutes: ["register", "login"],
  passwordEncryptionKey: process.env.PASSWORD_ENCRYPTION_KEY,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  secretKey: process.env.SECRET_KEY,
  cloudinaryName: process.env.CLOUDINARY_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  tintPngApiKey: process.env.TINY_PNG_API_KEY,
};
