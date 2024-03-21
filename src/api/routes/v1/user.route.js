const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user.controller");
const { validateUser, validateLogin } = require("../../util/api-validator");

router.route("/register").post(validateUser, controller.register);
router.route("/login").post(validateLogin, controller.login);

module.exports = router;
