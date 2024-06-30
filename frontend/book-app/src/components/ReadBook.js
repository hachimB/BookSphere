import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ReadBook() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}/read`);
        setBook(response.data.book);
        setChapters(response.data.chapters);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [bookId]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <h3>Chapters:</h3>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter._id}>
            <h4>{chapter.title}</h4>
            <div dangerouslySetInnerHTML={{ __html: chapter.content }}></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadBook;
