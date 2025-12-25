const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const {protect}= require('../middleware/authMiddleware')

// Define endpoints and link them to controller functions
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

module.exports = router;