

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// GET /api/bookings - Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await bookingController.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to retrieve bookings', error: error.message });
  }
});

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await bookingController.getBookingById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Failed to retrieve booking', error: error.message });
  }
});

// POST /api/bookings - Create new booking
router.post('/', async (req, res) => {
  const { customer_id, destination, date, agent_id } = req.body;

  // Basic validation (can be enhanced using Joi or express-validator)
  if (!customer_id || !destination || !date || !agent_id) {
    return res.status(400).json({ message: 'All booking fields are required' });
  }

  try {
    const newBooking = await bookingController.addBooking({ customer_id, destination, date, agent_id });
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
});

// PUT /api/bookings/:id - Update booking by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { customer_id, destination, date, agent_id } = req.body;

  try {
    const updatedBooking = await bookingController.updateBooking(id, {
      customer_id,
      destination,
      date,
      agent_id,
    });

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Failed to update booking', error: error.message });
  }
});

// DELETE /api/bookings/:id - Delete booking by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await bookingController.deleteBooking(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Failed to delete booking', error: error.message });
  }
});

module.exports = router;
