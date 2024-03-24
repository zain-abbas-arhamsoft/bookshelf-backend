const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");
const jwt = require("jwt-simple");
// const {
//   jwtExpirationInterval,
//   passwordEncryptionKey,
// } = require("../../config/var");

const passwordEncryptionKey = "passwordEncryptionKey"
const jwtExpirationInterval = 525600
/**
 * User Model
 * @private
 */
const User = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    username: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    country: { type: String },
    password: { type: String },
    accessToken: { type: String },
    googleId: { type: String },
    facebookId: { type: String },
    twitterId: { type: String },
  },
  { timestamps: true },
);

/**
 * Methods
 */

User.method({
  verifyPassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
  token() {
    const payload = {
      exp: moment().add(jwtExpirationInterval, "minutes").unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.encode(payload, "passwordEncryptionKey");
  },
});

User.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();
    const rounds = passwordEncryptionKey ? Number(passwordEncryptionKey) : 10;
    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * @typedef User
 */

module.exports = mongoose.model("User", User);
