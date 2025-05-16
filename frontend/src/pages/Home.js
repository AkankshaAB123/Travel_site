import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for user data in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing user data:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const fetchHotels = async () => {
    setIsLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/hotels', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }

      const data = await response.json();
      console.log('Hotels:', data);
      // Handle the hotels data here
    } catch (err) {
      setError(err.message);
      console.error('Error fetching hotels:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="text-center">
          <h1 className="home-title">
            Welcome to the Travel Site
          </h1>
          
          {user ? (
            <div className="mt-8">
              <p className="home-welcome-text">
                Welcome back, <span className="font-semibold text-indigo-600">{user.username}</span>!
              </p>
              <div className="home-button-container">
                <Link
                  to="/places"
                  className="home-button home-button-primary"
                >
                  View Destinations
                </Link>
                <Link
                  to="/hotels"
                  className="home-button home-button-primary"
                >
                  View Hotels
                </Link>
                <button
                  onClick={handleLogout}
                  className="home-button home-button-secondary"
                >
                  Logout
                </button>
              </div>
              {error && (
                <div className="home-error">
                  <p className="home-error-text">{error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8">
              <p className="home-welcome-text">
                Please log in to access all features
              </p>
              <div className="home-button-container">
                <Link
                  to="/login"
                  className="home-button home-button-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="home-button home-button-secondary"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
