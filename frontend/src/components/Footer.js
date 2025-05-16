import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Travel Site
            </Link>
            <p className="footer-description">
              Your one-stop destination for planning the perfect trip. Discover amazing places,
              book hotels, and create unforgettable memories.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <h3 className="footer-section-title">Quick Links</h3>
              <ul className="footer-links-list">
                <li className="footer-link-item">
                  <Link to="/" className="footer-link">
                    Home
                  </Link>
                </li>
                <li className="footer-link-item">
                  <Link to="/places" className="footer-link">
                    Destinations
                  </Link>
                </li>
                <li className="footer-link-item">
                  <Link to="/hotels" className="footer-link">
                    Hotels
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-contact">
            <h3 className="footer-section-title">Contact Us</h3>
            <div className="footer-contact-item">
              <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@travelsite.com</span>
            </div>
            <div className="footer-contact-item">
              <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+1 234 567 890</span>
            </div>
            <div className="footer-contact-item">
              <svg className="footer-contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>123 Travel Street, City, Country</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Travel Site. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 