const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//route for user registration and login
// These routes handle user registration and login functionality.
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;