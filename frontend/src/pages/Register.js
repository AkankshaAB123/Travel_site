import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Register.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, email: form.email, password: form.password }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }
      setSuccess('Registration successful! You can now sign in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError('An error occurred during registration.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-background">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
          alt="Travel background"
        />
        <div className="register-overlay" />
      </div>
      <div className="register-form-container">
        <h2 className="register-title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-form-group">
            <label className="register-label">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="register-input"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="register-form-group">
            <label className="register-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="register-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="register-form-group">
            <label className="register-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="register-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="register-form-group">
            <label className="register-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="register-input"
              placeholder="Confirm your password"
              required
            />
          </div>
          {error && <div className="register-error">{error}</div>}
          {success && <div className="register-success">{success}</div>}
          <button
            type="submit"
            className="register-button"
          >
            Sign Up
          </button>
        </form>
        <div className="register-signin">
          Already have an account?{' '}
          <span
            className="register-signin-link"
            onClick={() => navigate('/login')}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register; 