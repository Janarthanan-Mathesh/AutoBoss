const express = require('express');
const { getReports, exportReports } = require('../controllers/reportController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, getReports);
router.get('/export', auth, exportReports);

module.exports = router;