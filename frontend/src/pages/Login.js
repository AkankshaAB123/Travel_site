import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Login.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include'
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Login failed');
        return;
      }
      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
          alt="Travel background"
        />
        <div className="login-overlay" />
      </div>
      <div className="login-form-container">
        <h2 className="login-title">Sign In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label className="login-label">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="login-input"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="login-form-group">
            <label className="login-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="login-input"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button
            type="submit"
            className="login-button"
          >
            Sign In
          </button>
        </form>
        <div className="login-signup">
          Don&apos;t have an account?{' '}
          <span
            className="login-signup-link"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login; 