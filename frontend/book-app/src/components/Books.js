// src/components/Books.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import '../styles/Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    publishedYear: '',
  });
  const [editModeId, setEditModeId] = useState('');
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://booksphere-backend-htz4.onrender.com/api/books');
      setBooks(response.data);
      setGenres([...new Set(response.data.map(book => book.genre))]);
      setAuthors([...new Set(response.data.map(book => book.author))]);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Add a new book
  const addBook = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.post('https://booksphere-backend-htz4.onrender.com/api/books', newBook, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBooks([...books, response.data.book]); // Update books state with new book
      clearForm();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`https://booksphere-backend-htz4.onrender.com/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBooks(books.filter(book => book._id !== id)); // Update books state by removing deleted book
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Update book state when form inputs change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // Toggle edit mode for a book and populate the form with the book's current data
  const toggleEditMode = (id) => {
    const bookToEdit = books.find(book => book._id === id);
    setNewBook({
      title: bookToEdit.title,
      author: bookToEdit.author,
      genre: bookToEdit.genre,
      description: bookToEdit.description,
      publishedYear: bookToEdit.publishedYear,
    });
    setEditModeId(id);
  };

  // Update book on the server
  const updateBook = async (id) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.put(`https://booksphere-backend-htz4.onrender.com/api/books/${id}`, newBook, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Replace the updated book in the state with the response data
      setBooks(books.map(book => (book._id === id ? response.data.book : book)));
      setEditModeId(''); // Exit edit mode after successful update
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Clear form fields
  const clearForm = () => {
    setNewBook({
      title: '',
      author: '',
      genre: '',
      description: '',
      publishedYear: '',
    });
  };

  // Filter books based on selected genre and author
  const filteredBooks = books.filter(book => {
    return (
      (selectedGenre === '' || book.genre === selectedGenre) &&
      (selectedAuthor === '' || book.author === selectedAuthor)
    );
  });

  return (
    <div className="books">
      <h2>Books</h2>
      <div className="filters">
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
        <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
          <option value="">All Authors</option>
          {authors.map((author, index) => (
            <option key={index} value={author}>{author}</option>
          ))}
        </select>
      </div>
      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book._id} className="book-item">
            {editModeId === book._id ? (
              <div className="book-edit">
                <input
                  type="text"
                  name="title"
                  value={newBook.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  required
                />
                <input
                  type="text"
                  name="author"
                  value={newBook.author}
                  onChange={handleInputChange}
                  placeholder="Author"
                  required
                />
                <input
                  type="text"
                  name="genre"
                  value={newBook.genre}
                  onChange={handleInputChange}
                  placeholder="Genre"
                  required
                />
                <textarea
                  name="description"
                  value={newBook.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  required
                />
                <input
                  type="text"
                  name="publishedYear"
                  value={newBook.publishedYear}
                  onChange={handleInputChange}
                  placeholder="Published Year"
                  required
                />
                <input
                  type="text"
                  onChange={handleInputChange}
                  required
                />
                <button onClick={() => updateBook(book._id)}>Save</button>
                <button onClick={() => setEditModeId('')}>Cancel</button>
              </div>
            ) : (
              <div className="book-details">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Published Year:</strong> {book.publishedYear}</p>
                <Link to={`/books/${book._id}`} className="read-button">Read</Link> {/* Link to ReadBook component */}
                <button onClick={() => deleteBook(book._id)}>Delete</button>
                <button onClick={() => toggleEditMode(book._id)}>Update</button>
              </div>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Books;
