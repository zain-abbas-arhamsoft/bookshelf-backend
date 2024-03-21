const express = require("express");
const router = express.Router();
const controller = require("../../controllers/book.controller");
const { imageUpload } = require("../../util/upload");

router.route("/create").post(imageUpload, controller.create);
router.route("/genre").get(controller.getGenre);
router.route("/books").get(controller.getAllBooks);

module.exports = router;
