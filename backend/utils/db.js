import mongoose from 'mongoose';
import Book from '../models/book';
import dotenv from 'dotenv';

dotenv.config();

class BookDb {
  constructor() {
    const host = process.env.MONGO_HOST || 'localhost';
    const port = process.env.MONGO_PORT || '5001';
    const dbName = process.env.MONGO_DB || 'bookDb';

    const mongoURI = `mongodb://${host}:${port}/${dbName}`;

    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB connected...'))
      .catch(err => console.log(err));
  }

  async createBook(bookData) {
    try {
      const book = new Book(bookData);
      await book.save();
      return book;
    } catch (error) {
      throw new Error('Error creating book: ' + error.message);
    }
  }

  async getBookById(bookId) {
    try {
      const book = await Book.findById(bookId);
      return book;
    } catch (error) {
      throw new Error('Error fetching book: ' + error.message);
    }
  }

  async getAllBooks() {
    try {
      const books = await Book.find();
      return books;
    } catch (error) {
      throw new Error('Error fetching books: ' + error.message);
    }
  }

  async updateBook(bookId, bookData) {
    try {
      const book = await Book.findByIdAndUpdate(bookId, bookData, { new: true });
      return book;
    } catch (error) {
      throw new Error('Error updating book: ' + error.message);
    }
  }

  async deleteBook(bookId) {
    try {
      await Book.findByIdAndDelete(bookId);
      return { message: 'Book deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting book: ' + error.message);
    }
  }
}

export default BookDb;
