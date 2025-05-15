import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
      {/* Background image with overlay */}
      <div className="fixed inset-0 z-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
          alt="Travel background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-indigo-900/60" />
      </div>
      <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl w-full max-w-xl z-10 relative">
        <h2 className="text-5xl font-bold text-center text-indigo-700 mb-10" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-2xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 text-2xl"
              placeholder="Enter your username"
              required
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-2xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 text-2xl"
              placeholder="Enter your password"
              required
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            />
          </div>
          {error && <div className="text-red-600 text-center font-bold text-2xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{error}</div>}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg text-2xl transition duration-200"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Sign In
          </button>
        </form>
        <div className="mt-8 text-center text-gray-700 text-2xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
          Don&apos;t have an account?{' '}
          <span
            className="text-indigo-600 hover:underline cursor-pointer font-bold"
            onClick={() => navigate('/register')}
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login; 