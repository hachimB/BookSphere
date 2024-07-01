//ReadBook.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ReadBook.css';

function ReadBook() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}/read`);
        setBook(response.data.book);
        setChapters(response.data.chapters);
        setSelectedChapter(response.data.chapters.length > 0 ? response.data.chapters[0]._id : '');
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [bookId]);

  if (!book) return <div>Loading...</div>;

  const filteredChapter = chapters.find(chapter => chapter._id === selectedChapter);

  return (
    <div className="read-book-container">
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author">Author: {book.author}</p>
      <div className="chapter-selection">
        <label htmlFor="chapter-select">Select Chapter:</label>
        <select
          id="chapter-select"
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
        >
          {chapters.map((chapter) => (
            <option key={chapter._id} value={chapter._id}>{chapter.title}</option>
          ))}
        </select>
      </div>
      {filteredChapter && (
        <div className="chapter-content">
          <h4 className="chapter-title">{filteredChapter.title}</h4>
          <div dangerouslySetInnerHTML={{ __html: filteredChapter.content }}></div>
        </div>
      )}
    </div>
  );
}

export default ReadBook;
