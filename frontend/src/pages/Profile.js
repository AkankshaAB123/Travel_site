import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Information</h2>
          {user && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="mt-1 text-lg text-gray-900">{user.fname}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">City</p>
                <p className="mt-1 text-lg text-gray-900">{user.city}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="mt-1 text-lg text-gray-900">{user.phone}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Bookings</h2>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {bookings.length === 0 ? (
            <p className="text-gray-500">No bookings found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {bookings.map(booking => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Destination</p>
                      <p className="mt-1 text-lg text-gray-900">{booking.fdesti}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">City</p>
                      <p className="mt-1 text-lg text-gray-900">{booking.city}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="mt-1 text-lg text-gray-900">{booking.ffirst} {booking.flast}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Contact</p>
                      <p className="mt-1 text-lg text-gray-900">{booking.fphone}</p>
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