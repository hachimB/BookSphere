import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
        // Select the first chapter initially
        setSelectedChapter(response.data.chapters.length > 0 ? response.data.chapters[0]._id : '');
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [bookId]);

  if (!book) return <div>Loading...</div>;

  // Filter chapters based on selected chapter number
  const filteredChapter = chapters.find(chapter => chapter._id === selectedChapter);

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <h3>Chapters:</h3>
      <div>
        <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)}>
          <option value="">Select a Chapter</option>
          {chapters.map((chapter) => (
            <option key={chapter._id} value={chapter._id}>{chapter.title}</option>
          ))}
        </select>
      </div>
      {filteredChapter && (
        <div>
          <h4>{filteredChapter.title}</h4>
          <div dangerouslySetInnerHTML={{ __html: filteredChapter.content }}></div>
        </div>
      )}
    </div>
  );
}

export default ReadBook;
