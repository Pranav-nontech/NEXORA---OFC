const User = require('../models/user');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }); // Plain text for demo; use hashing in production
  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};