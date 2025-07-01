const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get user profile - requires authentication
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
