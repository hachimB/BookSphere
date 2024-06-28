import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Library = () => {
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      if (!token) {
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserId(res.data._id);
      } catch (error) {
        console.error('Error fetching user:', error);
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
        const response = await axios.get(`http://localhost:5000/api/users/${userId}/library`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('API response:', response.data); // Debugging line
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

  return (
    <div className="library">
      <h2>Your Library</h2>
      {userBooks.length === 0 ? (
        <p>No books in your library.</p>
      ) : (
        <ul>
          {userBooks.map(book => (
            <li key={book.bookId._id}>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Description:</strong> {book.description}</p>
              <p><strong>Published Year:</strong> {book.publishedYear}</p>
              <p><strong>Price:</strong> ${book.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Library;
