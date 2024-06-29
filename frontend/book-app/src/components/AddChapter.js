// AddChapter.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import QuillEditor from './QuillEditor';

const AddChapter = () => {
  const { bookId } = useParams();
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterNumber, setChapterNumber] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    const chapterData = {
      title: chapterTitle,
      number: chapterNumber,
      content,
    };

    const token = Cookies.get('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/books/${bookId}/chapters`, chapterData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Chapter added successfully:', response.data);
        setChapterTitle('');
        setChapterNumber('');
        setContent('');
      } else {
        console.error('Failed to add chapter:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Add a New Chapter</h1>
      <div>
        <label>
          Chapter Title:
          <input
            type="text"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Chapter Number:
          <input
            type="number"
            value={chapterNumber}
            onChange={(e) => setChapterNumber(e.target.value)}
          />
        </label>
      </div>
      <QuillEditor content={content} setContent={setContent} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddChapter;
