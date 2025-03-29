const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User'); // Assuming your user model is in models/User.js
require('dotenv').config(); // Load environment variables

// Secret key for JWT (stored in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, // Payload
    JWT_SECRET,
    { expiresIn: '1h' } // Token expires in 1 hour
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    console.log('Validation errors:', errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, ...otherUserData } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      ...otherUserData
    };

    console.log('User data:', userData);

    // Create new user
    user = new User(userData);

    await user.save();

    // Generate JWT
    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'strict',
      maxAge: 3600000,
    });

    // Respond with token and user info (excluding password)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        ...otherUserData
      },
    });
  } catch (error) {
    console.error('Error in register:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }); // Exclude password and __v from the response

    console.log('User found:', user);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
    }

    // Respond with token and user info (excluding password)
    res.status(200).json({
      message: 'Login successful',
      user: userData,
    });
  } catch (error) {
    console.error('Error in login:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (requires JWT)
const getProfile = async (req, res) => {
  try {
    // req.user is set by the auth middleware (see middleware/auth.js)
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile retrieved successfully',
      user,
    });
  } catch (error) {
    console.error('Error in getProfile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};