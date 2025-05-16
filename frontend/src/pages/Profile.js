import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(storedUser));

    // Fetch user's bookings
    fetch('http://localhost:5000/api/bookings', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch bookings');
        return res.json();
      })
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="profile-loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-section">
          <h2 className="profile-title">Profile Information</h2>
          {user && (
            <div className="profile-grid">
              <div className="profile-field">
                <p className="profile-label">Name</p>
                <p className="profile-value">{user.fname}</p>
              </div>
              <div className="profile-field">
                <p className="profile-label">Email</p>
                <p className="profile-value">{user.email}</p>
              </div>
              <div className="profile-field">
                <p className="profile-label">City</p>
                <p className="profile-value">{user.city}</p>
              </div>
              <div className="profile-field">
                <p className="profile-label">Phone</p>
                <p className="profile-value">{user.phone}</p>
              </div>
            </div>
          )}
        </div>

        <div className="profile-section">
          <h2 className="profile-title">Your Bookings</h2>
          {error && (
            <div className="profile-error">
              <p className="profile-error-text">{error}</p>
            </div>
          )}
          {bookings.length === 0 ? (
            <p className="profile-empty">No bookings found.</p>
          ) : (
            <div className="profile-grid">
              {bookings.map(booking => (
                <div key={booking.id} className="profile-booking">
                  <div className="profile-grid">
                    <div className="profile-field">
                      <p className="profile-label">Destination</p>
                      <p className="profile-value">{booking.fdesti}</p>
                    </div>
                    <div className="profile-field">
                      <p className="profile-label">City</p>
                      <p className="profile-value">{booking.city}</p>
                    </div>
                    <div className="profile-field">
                      <p className="profile-label">Name</p>
                      <p className="profile-value">{booking.ffirst} {booking.flast}</p>
                    </div>
                    <div className="profile-field">
                      <p className="profile-label">Contact</p>
                      <p className="profile-value">{booking.fphone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 