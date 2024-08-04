import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Register(setCurrentPage) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLinkClick = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username: username,
        email:email,
        password: password
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response ? error.response.data : 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">Register</button>
      </form>
        <div className="auth-link">
            <Link
              to="/login"
              onClick={() => handleLinkClick('/login')}
            >Already have an account? Sign in</Link>
        </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;