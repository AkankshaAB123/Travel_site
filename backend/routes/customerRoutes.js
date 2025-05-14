const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController'); // Import the customer controller

// Route to get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await customerController.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get customers', error });
  }
});

// Route to get a specific customer by ID
router.get('/:id', async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await customerController.getCustomerById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get customer', error });
  }
});

// Route to add a new customer
router.post('/', async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const newCustomer = await customerController.addCustomer({ name, email, phone, address });
    res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create customer', error });
  }
});

// Route to update an existing customer by ID
router.put('/:id', async (req, res) => {
  const customerId = req.params.id;
  const { name, email, phone, address } = req.body;
  try {
    const updatedCustomer = await customerController.updateCustomer(customerId, { name, email, phone, address });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update customer', error });
  }
});

// Route to delete a customer by ID
router.delete('/:id', async (req, res) => {
  const customerId = req.params.id;
  try {
    const deletedCustomer = await customerController.deleteCustomer(customerId);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete customer', error });
  }
});

module.exports = router;
