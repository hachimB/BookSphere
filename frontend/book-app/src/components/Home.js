import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/Home.css';
import booksphereLogo from '../images/hachim-logo-png.jpg';


function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
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
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
        <img src={booksphereLogo} alt="BookSphere Logo" className="logo" />
        <div className="alx">alx</div> {/* Div with "alx" text */}
          <h1>Welcome to BookSphere</h1>
          <p>Your ultimate destination for exploring and discovering new books!</p>
          {user ? (
            <div className="user-info">
              <p>Welcome, {user.name}!</p>
              <p>Email: {user.email}</p>
            </div>
          ) : (
            <Link to="/login" className="btn">
              Get Started
            </Link>
          )}
        </div>
      </header>

      <section className="features-section">
        <div className="section-content">
          <h2>Key Features</h2>
          <div className="features-container">
            <div className="feature">
              <h3>Explore New Books</h3>
              <p>Discover a vast collection of books across genres.</p>
            </div>
            <div className="feature">
              <h3>Create Your Reading List</h3>
              <p>Organize books you want to read and track your progress.</p>
            </div>
            <div className="feature">
              <h3>Connect with Authors</h3>
              <p>Engage with authors and participate in discussions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="section-content">
          <h2>About BookSphere</h2>
          <p>BookSphere is your go-to platform for exploring a vast collection of books. Our mission is to connect readers with the books that inspire, challenge, and entertain.</p>
          <p>Explore BookSphere today and embark on a journey through the world of literature.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>Enjoying our website? Register with BookSphere to stay updated on new features and book releases.</p>
          {!user && (
            <Link to="/signup" className="btn">
              Sign Up
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}

export default Home;
