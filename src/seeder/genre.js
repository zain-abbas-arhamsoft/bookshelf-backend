const Genre = require('../api/models/genre.model');
const { connect } = require("../config/mongoose");
const mongoose = require('mongoose')
async function seedGenres() {
    await connect();

    // Define predefined genres
    const predefinedGenres = [
        { name: 'Science Fiction', description: 'Books focused on futuristic science and technology' },
        { name: 'Fantasy', description: 'Books featuring magic, mythical creatures, and imaginative worlds' },
        // Add more predefined genres as needed
    ];

    try {
        for (const genreData of predefinedGenres) {
            // Check if the genre already exists in the database
            const existingGenre = await Genre.findOne({ name: genreData.name });
            if (!existingGenre) {
                await Genre.create(genreData);
            }
        }
    } catch (error) {
        console.error('Error seeding genres:', error);
    } finally {
        // Close the database connection
        mongoose.disconnect();
    }
}

seedGenres();
module.exports = seedGenres;
