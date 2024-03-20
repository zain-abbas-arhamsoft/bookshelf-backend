require("dotenv").config();
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  baseUrl: process.env.BASE_URL,
  bypassedRoutes: ["register", "login"],
  passwordEncryptionKey: process.env.PASSWORD_ENCRYPTION_KEY,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
};
