const jwt = require('jsonwebtoken');
require('dotenv').config();
const { body } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const authorizeUser = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user data to request (e.g., req.user.id)
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('accountType')
    .isIn(['customer', 'business'])
    .withMessage('Account type must be either customer or business'),
  body('businessName')
    .if((value, { req }) => req.body?.accountType === 'business') // ✅ Ensure req.body exists
    .notEmpty()
    .withMessage('Business name is required'),
  body('phoneNumber').isMobilePhone('any').withMessage('Please provide a valid phone number'),
  body('termsConsent')
        .isBoolean()
        .withMessage('You must accept the terms and conditions'),
  body('marketingConsent')
        .isBoolean().optional()
];

const validateLogin = [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ];

module.exports = { authorizeUser, validateRegister, validateLogin };