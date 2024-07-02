// src/components/Library.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import '../styles/Library.css';

const Library = () => {
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('https://booksphere-backend-htz4.onrender.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserId(res.data._id);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoggedIn(false);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUserLibrary = async () => {
      const token = Cookies.get('token');
      if (!token) {
        return;
      }

      try {
        const response = await axios.get(`https://booksphere-backend-htz4.onrender.com/api/users/${userId}/library`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user library:', error);
        setLoading(false);
      }
    };

    fetchUserLibrary();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loggedIn) {
    return <div>Please log in to view your library.</div>;
  }

  return (
    <div className="library">
      <h2>Your Library</h2>
      {userBooks.length === 0 ? (
        <p>No books in your library.</p>
      ) : (
        <div className="slides-container">
          {userBooks.map(book => (
            <div key={book.bookId._id} className="slide">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Description:</strong> {book.description}</p>
              <p><strong>Published Year:</strong> {book.publishedYear}</p>
              <div className="slide-buttons">
                <Link to={`/books/${book.bookId._id}`} className="read-button">Read</Link>
                <a href={`https://booksphere-frontend.onrender.com/books/${book.bookId._id}/addchapter`} className="add-chapter-link">Add Chapter</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
