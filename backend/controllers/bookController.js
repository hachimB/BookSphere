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

    // Remove the book ID from the user's library
    user.library = user.library.filter((item) => !item.bookId || item.bookId.toString() !== req.params.id);
    await user.save();

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
    user.library.push({bookId: newBook._id, title: newBook.title, author: newBook.author, genre: newBook.genre, description: newBook.description, publishedYear: newBook.publishedYear, price: newBook.price});
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}




exports.updateBook = async (req, res) => {
  try {
    // Check if the ID is valid
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    // Find the book by ID
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(400).json({ error: 'Book not found' });
    }

    // Check if the user is the owner of the book
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Only the owner can update this book' });
    }

    // Update the book in the global space
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Find the user and update the book in their library
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const bookIndex = user.library.findIndex(item => item.bookId && item.bookId.toString() === req.params.id);
    if (bookIndex !== -1) {
      user.library[bookIndex] = {
        bookId: updatedBook._id,
        title: updatedBook.title,
        author: updatedBook.author,
        genre: updatedBook.genre,
        description: updatedBook.description,
        publishedYear: updatedBook.publishedYear,
        price: updatedBook.price,
      };
      await user.save();
    }

    res.status(200).json({ message: 'Book successfully updated', book: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
