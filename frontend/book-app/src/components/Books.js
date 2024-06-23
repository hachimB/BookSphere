import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books'); // Update the URL if necessary
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="books">
      <h2>Books</h2>
      <div className="book-list">
        {books.map((book) => (
          <div key={book._id} className="book-item">
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Published Year:</strong> {book.publishedYear}</p>
            <p><strong>Price:</strong> ${book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
