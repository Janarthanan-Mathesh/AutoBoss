const express = require('express');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Protected admin route
router.get('/dashboard', auth, (req, res) => {
  res.json({
    message: `Welcome Admin, ${req.admin.username}`,
    adminData: req.admin
  });
});

module.exports = router;
