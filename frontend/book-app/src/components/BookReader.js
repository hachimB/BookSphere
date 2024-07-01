// src/components/ReadBook.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReadBook = () => {
  const { bookId } = useParams();
  const [bookContent, setBookContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookContent = async () => {
      try {
        const response = await axios.get(`https://booksphere-backend-htz4.onrender.com/api/books/${bookId}/read`);
        setBookContent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book content:', error);
        setLoading(false);
      }
    };

    fetchBookContent();
  }, [bookId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="read-book">
      <h2>{bookContent.title}</h2>
      <p><strong>Author:</strong> {bookContent.author}</p>
      <p><strong>Genre:</strong> {bookContent.genre}</p>
      <p><strong>Description:</strong> {bookContent.description}</p>
      <div className="book-content">
        {bookContent.content}
      </div>
    </div>
  );
};

export default ReadBook;
