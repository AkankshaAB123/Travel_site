import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Importing page components
import Home from './pages/Home';
import Agents from './pages/Agents';
import Bookings from './pages/Bookings';
import Customers from './pages/Customers';
import Feedback from './pages/Feedback';
import Hotels from './pages/Hotels';
import Payments from './pages/Payments';
import Places from './pages/Places';
import NotFound from './pages/NotFound'; // Optional: for unmatched routes
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/agents" element={
          <ProtectedRoute>
            <Agents />
          </ProtectedRoute>
        } />
        <Route path="/bookings" element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        } />
        <Route path="/customers" element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        } />
        <Route path="/feedback" element={
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        } />
        <Route path="/hotels" element={
          <ProtectedRoute>
            <Hotels />
          </ProtectedRoute>
        } />
        <Route path="/payments" element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        } />
        <Route path="/places" element={
          <ProtectedRoute>
            <Places />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
