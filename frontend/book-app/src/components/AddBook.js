import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import QuillEditor from './QuillEditor';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [publishedYear, setPublishedYear] = useState('');

  const handleSubmit = async () => {
    const bookData = {
      title,
      author,
      content,
      genre,
      description,
      publishedYear,
    };

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

      if (response.status === 201) {
        console.log('Book added successfully:', response.data);
        setTitle('');
        setAuthor('');
        setContent('');
        setGenre('');
        setDescription('');
        setPublishedYear('');
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
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Genre:
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Published Year:
          <input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
          />
        </label>
      </div>
      <QuillEditor content={content} setContent={setContent} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddBook;
