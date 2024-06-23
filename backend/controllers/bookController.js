// controllers/bookController.js

const Book = require('../models/book');
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;

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


exports.getABook = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(400).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.deleteBook = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const bookToDelete = await Book.findByIdAndDelete(req.params.id);
    if (!bookToDelete) {
      return res.status(400).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book successfully deleted '});
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.addBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({ message: 'Book successfully added', book: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.updateBook = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'invalid ID'});
    }
    const bookToUpdate = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });
    if (!bookToUpdate) {
      return res.status(400).json({ error: 'Book not found'});
    }
    res.status(200).json({ message: 'Book successfully updated', book: bookToUpdate })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error ' });
  }
}
