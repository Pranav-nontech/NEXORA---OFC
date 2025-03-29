const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/auth');

const logPayload = (req, res, next) => {
  console.log('Request Payload:', req.body);
  next();
};

router.post('/register', [logPayload, validateRegister], register);
router.post('/login', validateLogin, login);

module.exports = router;