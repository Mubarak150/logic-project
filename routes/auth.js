const express = require('express');
const { signIn, registerAdmin, logout } = require('../controllers/authController');
const {protect, checkSignIn} = require('../middleware/auth');
const router = express.Router();

// for dev: all the three are defined in authController... 
router.post('/sign-in', checkSignIn, signIn);
router.post('/register', protect, registerAdmin);
router.post('/logout', logout); // log out

module.exports = router;
