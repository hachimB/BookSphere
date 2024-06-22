// controllers/bookController.js

const Book = require('../models/book');

// Function to fetch all books
exports.getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();
        res.json(allBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
