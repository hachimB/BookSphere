// controllers/bookController.js

const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;
const Book = require('../models/book');
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
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (book.user.toString() !== user.id) {
      return res.status(401).json({ error: 'Only the owner can delete this book' });
    }
    await Book.findByIdAndDelete(req.params.id);
    user.library = user.library.filter((item) => item.bookId.toString() !== req.params.id);
    await user.save();
    res.status(200).json({ message: 'Book successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addBook = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { title, author, content } = req.body;

    const newBook = await Book.create({
      user: req.user.id,
      title,
      author,
      chapters: [{ title: 'Chapter 1', content }]
    });

    user.library.push({
      bookId: newBook._id,
      title: newBook.title,
      author: newBook.author,
      genre: newBook.genre,
      description: newBook.description,
      publishedYear: newBook.publishedYear,
      price: newBook.price
    });

    await user.save();
    res.status(201).json({ message: 'Book successfully added', book: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addChapter = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Only the owner can add a chapter to this book' });
    }
    
    const { content } = req.body;
    const chapterNumber = book.chapters.length + 1;
    const newChapter = {
      title: `Chapter ${chapterNumber}`,
      content
    };

    book.chapters.push(newChapter);
    await book.save();
    res.status(200).json({ message: 'Chapter successfully added', book });
  } catch (error) {
    console.error("Error adding chapter:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Only the owner can update this book' });
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const bookIndex = user.library.findIndex(item => item.bookId.toString() === req.params.id);
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
