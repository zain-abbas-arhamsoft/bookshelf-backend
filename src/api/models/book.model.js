const mongoose = require('mongoose');

/**
 * Book Model
 * @private
 */

// Define enum for book status
const BookStatus = ['Plan to Read', 'Reading', 'Completed'];
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationHouse: { type: String },
    publicationDate: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    publicationYear: { type: Number },
    status: {
        type: String, enum: BookStatus, default: BookStatus[0]
    },
    image: { type: String },
},
    {
        timestamps: true
    }
);

/**
 * @typedef Book
 */
module.exports = mongoose.model("Book", bookSchema);

