import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Places from './pages/Places';
import PlaceDetails from './pages/PlaceDetails';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Importing page components
import Agents from './pages/Agents';
import Customers from './pages/Customers';
import Feedback from './pages/Feedback';
import Hotels from './pages/Hotels';
import Payments from './pages/Payments';
import NotFound from './pages/NotFound'; // Optional: for unmatched routes

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
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
            <Route path="/places/:id" element={
              <ProtectedRoute>
                <PlaceDetails />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
