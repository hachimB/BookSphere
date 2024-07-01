// src/components/AddChapter.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import QuillEditor from './QuillEditor';
import '../styles/AddChapter.css';

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
      const response = await axios.post(
        `http://localhost:5000/api/books/${bookId}/chapters`,
        chapterData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    <div className="add-chapter-container">
      <h1>Add a New Chapter</h1>
      <div className="form-group">
        <label htmlFor="chapterTitle">Chapter Title:</label>
        <input
          type="text"
          id="chapterTitle"
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="chapterNumber">Chapter Number:</label>
        <input
          type="number"
          id="chapterNumber"
          value={chapterNumber}
          onChange={(e) => setChapterNumber(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Chapter Content:</label>
        <QuillEditor content={content} setContent={setContent} />
      </div>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddChapter;
