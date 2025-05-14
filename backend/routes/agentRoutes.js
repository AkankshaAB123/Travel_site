const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController'); // Import the agent controller

// Route to get all travel agents
router.get('/', async (req, res) => {
  try {
    const agents = await agentController.getAllAgents();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get agents', error });
  }
});

// Route to get a specific travel agent by ID
router.get('/:id', async (req, res) => {
  const agentId = req.params.id;
  try {
    const agent = await agentController.getAgentById(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get agent', error });
  }
});

// Route to add a new travel agent
router.post('/', async (req, res) => {
  const { name, email, phone, destination } = req.body;
  try {
    const newAgent = await agentController.addAgent({ name, email, phone, destination });
    res.status(201).json({ message: 'Agent added successfully', agent: newAgent });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add agent', error });
  }
});

// Route to update an existing travel agent by ID
router.put('/:id', async (req, res) => {
  const agentId = req.params.id;
  const { name, email, phone, destination } = req.body;
  try {
    const updatedAgent = await agentController.updateAgent(agentId, { name, email, phone, destination });
    if (!updatedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json({ message: 'Agent updated successfully', agent: updatedAgent });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update agent', error });
  }
});

// Route to delete a travel agent by ID
router.delete('/:id', async (req, res) => {
  const agentId = req.params.id;
  try {
    const deletedAgent = await agentController.deleteAgent(agentId);
    if (!deletedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete agent', error });
  }
});

module.exports = router;
