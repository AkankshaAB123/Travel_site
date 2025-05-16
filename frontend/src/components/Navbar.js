import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo">
              Travel Site
            </Link>
          </div>

          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/places" className="navbar-link">
              Destinations
            </Link>
            <Link to="/hotels" className="navbar-link">
              Hotels
            </Link>
          </div>

          <div className="navbar-actions">
            {user ? (
              <>
                <Link to="/profile" className="navbar-button navbar-button-secondary">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="navbar-button navbar-button-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-button navbar-button-secondary">
                  Login
                </Link>
                <Link to="/register" className="navbar-button navbar-button-primary">
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="navbar-mobile-menu">
            <button
              className="navbar-mobile-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="navbar-mobile-links">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/places" className="navbar-link">
              Destinations
            </Link>
            <Link to="/hotels" className="navbar-link">
              Hotels
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="navbar-link">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="navbar-button navbar-button-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
                <Link to="/register" className="navbar-button navbar-button-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 