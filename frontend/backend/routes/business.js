const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authorizeUser } = require('../middleware/auth');

// Get business settings
router.get('/settings', authorizeUser, async (req, res) => {
  try {
    if (req.user.accountType !== 'business') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      name: user.businessName,
      hours: user.hours || '9 AM - 5 PM',
      location: user.location || '123 Main St'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update business settings
router.post('/settings', authorizeUser, async (req, res) => {
  try {
    if (req.user.accountType !== 'business') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const { name, hours, location } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.businessName = name || user.businessName;
    user.hours = hours || user.hours;
    user.location = location || user.location;
    await user.save();
    res.json({ message: 'Settings updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;