const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");
const jwt = require("jsonwebtoken");
const {
  jwtExpirationInterval,
  passwordEncryptionKey,
} = require("../../config/var");
/**
 * User Model
 * @private
 */
const User = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    username: { type: String },
    password: { type: String },
    accessToken: { type: String },
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
       exp: moment().add(1, "days").unix(),
       exp: moment().add(jwtExpirationInterval, "minutes").unix(),
      sub: this._id,
      sub: this._id,
    };
    return jwt.sign(payload, passwordEncryptionKey);
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
