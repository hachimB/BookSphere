import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Library = () => {
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use the provided token and user ID
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2M2YmNhMDM4MTk2MzYyZTlkM2YzOCIsImlhdCI6MTcxOTUwNDk3NSwiZXhwIjoxNzIyMDk2OTc1fQ.Ek6cxRxdrlW1ieaZqnxWM1Yc0n0hlzw7cLlJMWqDwUE";
  const userId = "667c6bca038196362e9d3f38";

  useEffect(() => {
    const fetchUserLibrary = async () => {
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
  }, []);

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
