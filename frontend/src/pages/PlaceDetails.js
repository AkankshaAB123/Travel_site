import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/pages/PlaceDetails.css';

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    <div className="place-details-loading">
      <div>Loading destination details...</div>
    </div>
  );

  if (error) return (
    <div className="place-details-error">
      <div>Error: {error}</div>
    </div>
  );

  if (!place) return (
    <div className="place-details-not-found">
      <div>Destination not found</div>
    </div>
  );

  const images = place.information?.images || [];

  return (
    <div className="place-details-container">
      <div className="place-details-content">
        <button
          onClick={() => navigate('/places')}
          className="place-details-back"
        >
          <svg className="place-details-back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Destinations
        </button>

        <div className="place-details-card">
          <div className="place-details-content-inner">
            <h1 className="place-details-title">{place.pname}</h1>
            <p className="place-details-city">{place.pcity}</p>
            
            {images.length > 0 && (
              <div className="place-details-gallery">
                <div className="place-details-main-image">
                  <img 
                    src={`http://localhost:5000/${images[currentImageIndex]}`}
                    alt={`${place.pname} - Image ${currentImageIndex + 1}`}
                    className="place-details-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                    }}
                  />
                </div>
                {images.length > 1 && (
                  <div className="place-details-thumbnails">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`place-details-thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                      >
                        <img 
                          src={`http://localhost:5000/${img}`}
                          alt={`${place.pname} - Thumbnail ${index + 1}`}
                          className="place-details-thumbnail-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/100x75?text=Image+Not+Found';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {place.information && (
              <div className="place-details-section">
                <h2 className="place-details-section-title">About this Destination</h2>
                <p className="place-details-description">
                  {place.information.description}
                </p>

                <div className="place-details-info-grid">
                  <div className="place-details-info-card">
                    <h3 className="place-details-info-title">Best Time to Visit</h3>
                    <p className="place-details-info-text">{place.information.best_time_to_visit}</p>
                  </div>
                  <div className="place-details-info-card">
                    <h3 className="place-details-info-title">Local Attractions</h3>
                    <p className="place-details-info-text">{place.information.local_attractions}</p>
                  </div>
                  <div className="place-details-info-card">
                    <h3 className="place-details-info-title">Local Cuisine</h3>
                    <p className="place-details-info-text">{place.information.local_cuisine}</p>
                  </div>
                  <div className="place-details-info-card">
                    <h3 className="place-details-info-title">Transportation</h3>
                    <p className="place-details-info-text">{place.information.transportation}</p>
                  </div>
                  <div className="place-details-info-card">
                    <h3 className="place-details-info-title">Package Details</h3>
                    <p className="place-details-info-text">
                      Starting from ₹{place.information.package}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="place-details-section">
              <h2 className="place-details-section-title">Book Your Trip</h2>
              <button
                onClick={() => navigate('/bookings')}
                className="place-details-book-button"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails; 