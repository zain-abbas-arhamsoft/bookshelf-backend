const Book = require('../models/book.model');
const Genre = require('../models/genre.model'); // Import Genre model
const { bookCreateSuccess } = require("../../config/user-messages");
const {
    compressImage,
    uploadImagesToCloudinary
} = require("../util/function");
exports.create = async (req, res) => {
    try {
        const { userId } = req;
        const image = req.files.image[0]?.path;
        await compressImage(req.files, image);
        const uploadResponse = await uploadImagesToCloudinary(image);
        const parts = uploadResponse?.secure_url?.split("/");
        const extractedPath = "/" + parts.slice(6).join("/");

        req.body.image = extractedPath;
        const genre = await Genre.findById(req.body.genre);
        if (!genre) {
            return res.status(400).json({ success: false, message: "Invalid genre" });
        }
        // Append userId to the request body
        req.body.userId = userId;
        console.log(req.body)
        if (!genre) {
            return res.status(400).json({ success: false, message: "Invalid genre" });
        }

        // Create the book with the reference to the genre
        const book = await Book.create({ ...req.body, genre: genre._id });
        res.status(201).json({ success: true, message: bookCreateSuccess, book });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getGenre = async (req, res) => {
    try {
        // Check if genre exists in the database
        const genre = await Genre.find();
        // Create the book with the reference to the genre
        res.status(200).json({ success: true, data: genre });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        // Fetch all books with their corresponding genres
        const books = await Book.find().populate('genre');
        // If there are no books found, return a 404 status code with a message
        if (!books || books.length === 0) {
            return res.status(404).json({ success: false, message: "No books found" });
        }

        // Return the list of books with their genres
        res.status(200).json({ success: true, data: books });
    } catch (error) {
        // If an error occurs, return a 500 status code with the error message
        res.status(500).json({ success: false, message: error.message });
    }
};
