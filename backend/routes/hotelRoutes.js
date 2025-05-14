const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController'); // Import the hotel controller

// Route to get all hotels
router.get('/', hotelController.getAllHotels);

// Route to get a specific hotel by ID
router.get('/:id', hotelController.getHotelById);

// Route to add a new hotel
router.post('/', hotelController.addHotel);

// Route to update an existing hotel by ID
router.put('/:id', hotelController.updateHotel);

// Route to delete a hotel by ID
router.delete('/:id', hotelController.deleteHotel);

module.exports = router;
