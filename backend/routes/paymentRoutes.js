const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController'); // Import the payment controller

// Route to get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await paymentController.getAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve payments', error });
  }
});

// Route to get a specific payment by ID
router.get('/:id', async (req, res) => {
  const paymentId = req.params.id;
  try {
    const payment = await paymentController.getPaymentById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve payment', error });
  }
});

// Route to add a new payment
router.post('/', async (req, res) => {
  const { booking_id, amount, payment_method, status } = req.body;
  try {
    const newPayment = await paymentController.addPayment({ booking_id, amount, payment_method, status });
    res.status(201).json({ message: 'Payment added successfully', payment: newPayment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add payment', error });
  }
});

// Route to update an existing payment by ID
router.put('/:id', async (req, res) => {
  const paymentId = req.params.id;
  const { booking_id, amount, payment_method, status } = req.body;
  try {
    const updatedPayment = await paymentController.updatePayment(paymentId, { booking_id, amount, payment_method, status });
    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment updated successfully', payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update payment', error });
  }
});

// Route to delete a payment by ID
router.delete('/:id', async (req, res) => {
  const paymentId = req.params.id;
  try {
    const deletedPayment = await paymentController.deletePayment(paymentId);
    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete payment', error });
  }
});

module.exports = router;
