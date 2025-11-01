const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// protected route
router.get('/', auth, getDashboardStats);

module.exports = router;
