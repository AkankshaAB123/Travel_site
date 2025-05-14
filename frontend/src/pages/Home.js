import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('authHeader');
    navigate('/login');
  };

  const fetchHotels = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/hotels', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('authHeader') || ''
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1>Welcome to the Travel Site</h1>
          {user ? (
            <>
              <p className="lead">Welcome back, {user.username}!</p>
              <div className="mt-4">
                <Link to="/places" className="btn btn-primary me-3">View Destinations</Link>
                <button 
                  onClick={fetchHotels} 
                  className="btn btn-primary me-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'View Hotels'}
                </button>
                <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
              </div>
              {error && (
                <div className="alert alert-danger mt-3">
                  {error}
                </div>
              )}
            </>
          ) : (
            <>
              <p className="lead">Please login or register to continue</p>
              <div className="mt-4">
                <Link to="/login" className="btn btn-primary me-3">Login</Link>
                <Link to="/register" className="btn btn-outline-primary">Register</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
