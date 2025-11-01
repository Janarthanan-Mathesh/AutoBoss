const express = require('express');
const { getRentals, createRental, updateRental, deleteRental } = require('../controllers/rentalController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, getRentals);
router.post('/', auth, createRental);
router.put('/:id', auth, updateRental);
router.delete('/:id', auth, deleteRental);

module.exports = router;
