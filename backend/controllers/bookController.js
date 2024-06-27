// controllers/bookController.js

const Book = require('../models/book');
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;
const User = require('../models/user');

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

    // find the book by ID
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(400).json({ error: 'Book not found'});
    }

    // 
    const user = await User.findById(req.user.id);
    if (!book.user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Verify that the user who want to delete the book is the owner
    if (book.user.toString() !== user.id) {
      return res.status(401).json({ error: 'Only the owner can delete this book' });;
    }

    // Delete the book
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
    const newBook = await Book.create({ ...req.body, user: req.user.id });
    res.status(201).json({ message: 'Book successfully added', book: newBook });
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    user.library.push({bookID: newBook.id, title: newBook.title, author: newBook.author, genre: newBook.genre, description: newBook.description, publishedYear: newBook.publishedYear, price: newBook.price});
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}




exports.updateBook = async (req, res) => {
  try {

    // Check if the ID is valid or not
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'invalid ID'});
    }
    
    // Find The book by the ID
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(400).json({ error: 'Book not found'});
    }

    // Check if the user is the owner of the book
    const user = await User.findById(req.user.id);
    if (!book.user) {
      return res.status(400).json({ error: 'User not found' });
    }


    // Verify that the user who want to update the book is the owner
    if (book.user.toString() !== user.id) {
      return res.status(401).json({ error: 'Only the owner can delete this book' });;
    }

    // Update the book
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
