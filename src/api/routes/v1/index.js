const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");

/**
 * v1/
 */
router.use("/user", userRoutes);

module.exports = router;
