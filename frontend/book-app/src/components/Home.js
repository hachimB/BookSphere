import React from 'react';
import '../styles/Home.css'; // Import CSS file

function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to BookSphere</h1>
        <p>Your ultimate destination for exploring and discovering new books!</p>
        {/* Add more content or components as needed */}
        <a href="/" className="btn">Get Started</a>
      </div>
    </div>
  );
}

export default Home;
