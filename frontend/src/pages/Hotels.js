import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/Hotels.css';

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch('/api/hotels');
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }
      const data = await response.json();
      setHotels(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="hotels-loading">Loading hotels...</div>;
  }

  if (error) {
    return <div className="hotels-error">Error: {error}</div>;
  }

  return (
    <div className="hotels-container">
      <div className="hotels-content">
        <div className="hotels-header">
          <h1 className="hotels-title">Available Hotels</h1>
          <Link to="/" className="hotels-back">
            <svg className="hotels-back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        <div className="hotels-grid">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotels-card">
              <div className="hotels-card-content">
                <h2 className="hotels-name">{hotel.name}</h2>
                <p className="hotels-city">{hotel.city}</p>
                <p className="hotels-phone">Phone: {hotel.phone}</p>
                <button className="hotels-book-button">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hotels;
