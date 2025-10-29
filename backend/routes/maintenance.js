const express = require('express');
const { getMaintenance, createMaintenance } = require('../controllers/maintenanceController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch all maintenance records
router.get('/', auth, getMaintenance);

// Add a new maintenance record
router.post('/', auth, createMaintenance);

module.exports = router; // ✅ Important — export only the router
