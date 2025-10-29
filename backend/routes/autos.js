const express = require('express');
const { getAutos, createAuto, updateAuto, deleteAuto } = require('../controllers/autoController');
const auth = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', auth, getAutos);
router.post('/', auth, upload.single('image'), createAuto);
router.put('/:id', auth, updateAuto);
router.delete('/:id', auth, deleteAuto);

module.exports = router;