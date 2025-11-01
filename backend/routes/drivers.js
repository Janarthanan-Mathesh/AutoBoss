const express = require('express');
const {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
  getDriverById
} = require('../controllers/driverController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, getDrivers);          // Get all drivers
router.get('/:id', auth, getDriverById);    // Get driver by ID
router.post('/', auth, createDriver);       // Create new driver
router.put('/:id', auth, updateDriver);     // Update driver
router.delete('/:id', auth, deleteDriver);  // Delete driver

module.exports = router;
