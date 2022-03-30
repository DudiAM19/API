const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// register
router.post('/register', authController.Register);
// login
router.post('/login', authController.Login);

module.exports = router;