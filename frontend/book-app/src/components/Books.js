import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    publishedYear: '',
    price: ''
  });
  const [editModeId, setEditModeId] = useState('');

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
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
      const response = await axios.post('http://localhost:5000/api/books', newBook);
      setBooks([...books, response.data.book]); // Update books state with new book
      clearForm();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
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

  // Toggle edit mode for a book
  const toggleEditMode = (id) => {
    setEditModeId(id === editModeId ? '' : id); // Toggle edit mode
  };

  // Update book on the server
  const updateBook = async (id) => {
    try {
      const bookToUpdate = books.find(book => book._id === id);
      const response = await axios.put(`http://localhost:5000/api/books/${id}`, newBook);
      
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
      price: ''
    });
  };

  return (
    <div className="books">
      <h2>Books</h2>
      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="book-item">
            {editModeId === book._id ? (
              <div className="book-edit">
                <input type="text" name="title" value={newBook.title} onChange={handleInputChange} placeholder="Title" required />
                <input type="text" name="author" value={newBook.author} onChange={handleInputChange} placeholder="Author" required />
                <input type="text" name="genre" value={newBook.genre} onChange={handleInputChange} placeholder="Genre" required />
                <textarea name="description" value={newBook.description} onChange={handleInputChange} placeholder="Description" required />
                <input type="text" name="publishedYear" value={newBook.publishedYear} onChange={handleInputChange} placeholder="Published Year" required />
                <input type="text" name="price" value={newBook.price} onChange={handleInputChange} placeholder="Price" required />
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
                <p><strong>Price:</strong> ${book.price}</p>
                <button onClick={() => deleteBook(book._id)}>Delete</button>
                <button onClick={() => toggleEditMode(book._id)}>Update</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="add-book-form">
        <h3>Add New Book</h3>
        <form onSubmit={(e) => { e.preventDefault(); addBook(); }}>
          <input type="text" name="title" value={newBook.title} onChange={handleInputChange} placeholder="Title" required />
          <input type="text" name="author" value={newBook.author} onChange={handleInputChange} placeholder="Author" required />
          <input type="text" name="genre" value={newBook.genre} onChange={handleInputChange} placeholder="Genre" required />
          <textarea name="description" value={newBook.description} onChange={handleInputChange} placeholder="Description" required />
          <input type="text" name="publishedYear" value={newBook.publishedYear} onChange={handleInputChange} placeholder="Published Year" required />
          <input type="text" name="price" value={newBook.price} onChange={handleInputChange} placeholder="Price" required />
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default Books;
