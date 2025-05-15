import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/places/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch destination details');
        return res.json();
      })
      .then(data => {
        setPlace(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-gray-600">Loading destination details...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-red-600">Error: {error}</div>
    </div>
  );

  if (!place) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-gray-600">Destination not found</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/places')}
          className="mb-8 text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Destinations
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{place.pname}</h1>
            <p className="text-2xl text-gray-600 mb-8">{place.pcity}</p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About this Destination</h2>
                <p className="text-gray-600">
                  Experience the beauty and culture of {place.pname}, located in {place.pcity}. 
                  This destination offers unique experiences and unforgettable memories.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book Your Trip</h2>
                <button
                  onClick={() => navigate('/bookings')}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails; 