import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users', { name, email, password });
      setMessage('User registered successfully');
      Cookies.set('token', res.data.token, { expires: 1 }); // Store the token in a cookie, expires in 1 day
      window.location.href = '/profile'; // Redirect to profile
    } catch (err) {
      setMessage(err.response.data.error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Signup;