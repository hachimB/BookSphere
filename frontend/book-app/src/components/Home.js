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
        const res = await axios.get('https://booksphere-backend-htz4.onrender.com/api/users/me', {
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
          <h1>Welcome to BookSphere</h1>
          <p>Your ultimate destination for exploring and discovering new books!</p>
          {user ? (
            <div className="user-info">
              <p>Welcome, {user.name}!</p>
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
              <h3>Secure User Authentication and Profile Management</h3>
              <p>Safeguard your account with robust authentication methods and customize your profile to reflect your reading preferences.</p>
            </div>
            <div className="feature">
              <h3>Personal Book Collection Management</h3>
              <p>Easily add, organize, and track your books in a personal library.</p>
            </div>
            <div className="feature">
              <h3>Explore and Read Shared Books</h3>
              <p>Discover and enjoy books shared by other users.</p>
            </div>
          </div>
        </div>
      </section>
          
      <section className="about-section">
        <div className="section-content">
          <h2>What is BookSphere?</h2>
          <p>BookSphere is your ultimate platform for managing your personal book collection and exploring a diverse array of shared books. Our mission is to provide a secure and engaging environment where readers can organize their collections, discover new reads, and connect with a vibrant community of book enthusiasts.

Discover BookSphere today and elevate your reading experience.</p>
          <p>Explore BookSphere today and embark on a journey through the world of literature.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>Copyright @ 2024 BookSphere | Provided by Houcine Walaq, Hamza El Imali, Hachim Boubacar</p>
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
