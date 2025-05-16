import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Places.css';

// Import images
import tajMahalImage from '../assets/images/taj-mahal.jpeg';
import goaBeachImage from '../assets/images/goa-beach.jpeg';
import indiaGateImage from '../assets/images/india-gate.jpeg';
import keralaBeachImage from '../assets/images/kerala-beach.jpeg';
import mysorePalaceImage from '../assets/images/mysore-palace.jpeg';
import ladakhImage from '../assets/images/ladakh.jpeg';

const Places = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Mock data for places with images
    const mockPlaces = [
      {
        pid: 1,
        pname: 'Taj Mahal',
        pcity: 'Agra',
        image: tajMahalImage
      },
      {
        pid: 2,
        pname: 'Beach',
        pcity: 'Goa',
        image: goaBeachImage
      },
      {
        pid: 3,
        pname: 'India Gate',
        pcity: 'Delhi',
        image: indiaGateImage
      },
      {
        pid: 4,
        pname: 'Kerala Beach',
        pcity: 'Kerala',
        image: keralaBeachImage
      },
      {
        pid: 5,
        pname: 'Mysore Palace',
        pcity: 'Mysore',
        image: mysorePalaceImage
      },
      {
        pid: 6,
        pname: 'Ladakh',
        pcity: 'Ladakh India',
        image: ladakhImage
      }
    ];

    setPlaces(mockPlaces);
    setLoading(false);
  }, []);

  if (loading) return <div className="places-loading">Loading...</div>;
  if (error) return <div className="places-error">{error}</div>;

  return (
    <div className="places-container">
      {places.map(place => (
        <div key={place.pid} className="places-card">
          <div className="places-image-container">
            <img 
              src={place.image} 
              alt={`${place.pname} in ${place.pcity}`}
              className="places-image"
            />
          </div>
          <div className="places-content">
            <div className="places-header">
              <h2 className="places-title">{place.pname}</h2>
              <button
                onClick={() => navigate(`/places/${place.pid}`)}
                className="places-button"
              >
                View Details
              </button>
            </div>
            <p className="places-city">{place.pcity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Places;
