import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin, setCurrentPage }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook für Navigation

  const handleLinkClick = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        identifier,
        password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      onLogin(user);
      setMessage('Login successful');
      navigate('/'); // Weiterleitung zur Startseite oder einer anderen Seite
    } catch (error) {
      setMessage(error.response ? error.response.data : 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label htmlFor="identifier">Username or Email</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
        <button type="submit" className="auth-button">Login</button>
        {message && <p>{message}</p>}
      </form>
        <div className="auth-link">
            <Link
              to="/register"
              onClick={() => handleLinkClick('/register')}
            >Create new Account</Link>
        </div>
    </div>
  );
}

export default Login;