import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18
import App from './app';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';  // Custom CSS for the app

// Create a root element and render the App component inside the root div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
