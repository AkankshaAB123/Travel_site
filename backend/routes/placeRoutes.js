// routes/placeRoutes.js
const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController'); // Import the place controller

// Route to get all places
router.get('/', placeController.getAllPlaces);

// Route to get a specific place by ID
router.get('/:id', placeController.getPlaceById);

// Route to add a new place
router.post('/', placeController.addPlace);

// Route to update an existing place by ID
router.put('/:id', placeController.updatePlace);

// Route to delete a place by ID
router.delete('/:id', placeController.deletePlace);

module.exports = router;
