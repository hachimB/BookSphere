// AddBook.js
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import QuillEditor from './QuillEditor';

const AddBook = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async () => {
    const bookData = { title, author, content };

    const token = Cookies.get('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/books', bookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        console.log('Book added successfully:', response.data);
        setTitle('');
        setAuthor('');
        setContent('');
      } else {
        console.error('Failed to add book:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Add a New Book</h1>
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
      <QuillEditor content={content} setContent={setContent} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddBook;
