// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const predefinedUsers = [
  { email: 'admin@bssitm.com', password: 'admin123', role: 'admin' },
  { email: 'faculty@bssitm.com', password: 'faculty123', role: 'faculty' },
  { email: 'student@bssitm.com', password: 'student123', role: 'student' },
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const foundUser = predefinedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      setError('Invalid email or password');
      return;
    }

    localStorage.setItem('role', foundUser.role);
    login({ email, role: foundUser.role, name: foundUser.role.toUpperCase() });

    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="login-form">
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
