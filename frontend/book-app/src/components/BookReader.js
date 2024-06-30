// BookReader.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookReader = ({ bookId }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}/read`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.book.title}</h1>
      {book.chapters.map((chapter) => (
        <div key={chapter._id}>
          <h2>{chapter.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: chapter.content }}></div>
        </div>
      ))}
    </div>
  );
};

export default BookReader;
