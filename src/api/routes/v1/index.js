const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");
const bookRoutes = require("./book.route");

/**
 * v1/
 */
router.use("/user", userRoutes);
router.use("/book", bookRoutes);

module.exports = router;
