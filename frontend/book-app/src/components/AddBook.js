// AddBook.js
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import QuillEditor from './QuillEditor';

const AddBook = ({ bookId }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async () => {
    const chapterData = { content };

    const token = Cookies.get('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const url = bookId
        ? `http://localhost:5000/api/books/${bookId}/chapters`
        : 'http://localhost:5000/api/books';

      const response = await axios.post(url, bookId ? chapterData : { title, author, content }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        console.log('Book/Chapter added successfully:', response.data);
        setTitle('');
        setAuthor('');
        setContent('');
      } else {
        console.error('Failed to add book/chapter:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>{bookId ? 'Add a New Chapter' : 'Add a New Book'}</h1>
      {!bookId && (
        <>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </>
      )}
      <QuillEditor content={content} setContent={setContent} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddBook;
