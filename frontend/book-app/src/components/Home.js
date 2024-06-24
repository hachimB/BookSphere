import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Home.css'; // Import CSS file

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return; // Exit if no token found
      }

      try {
        const res = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to BookSphere</h1>
        <p>Your ultimate destination for exploring and discovering new books!</p>
        {user ? (
          <div>
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <a href="/login" className="btn">Get Started</a>
        )}
      </div>
    </div>
  );
}

export default Home;
