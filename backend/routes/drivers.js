const express = require('express');
const { getDrivers, createDriver, updateDriver, deleteDriver } = require('../controllers/driverController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, getDrivers);
router.post('/', auth, createDriver);
router.put('/:id', auth, updateDriver);
router.delete('/:id', auth, deleteDriver);

module.exports = router;