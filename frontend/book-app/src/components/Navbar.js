import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/Navbar.css';

function Navbar({ isLoggedIn }) {
  const handleLogout = () => {
    Cookies.remove('token');
    window.location.href = '/';
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/books">Books</Link></li>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
