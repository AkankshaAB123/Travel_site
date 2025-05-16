const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./connection'); // Import the database connection

// Load environment variables from .env
dotenv.config();

// Create the Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Make db available in request object
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
const bookingRoutes = require('./routes/bookingRoutes');
const agentRoutes = require('./routes/agentRoutes');
const customerRoutes = require('./routes/customerRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const placeRoutes = require('./routes/placeRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/bookings', bookingRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/auth', authRoutes);

// Serve static files from the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve frontend (React) in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

// 404 route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
