const Staff = require('../models/staff');

const createStaff = async (req, res) => {
  const { name, available } = req.body;

  try {
    if (req.user.accountType !== 'business') {
      return res.status(403).json({ message: 'Only business accounts can create staff' });
    }

    const staff = new Staff({ name, available });
    await staff.save();
    res.status(201).json({ message: 'Staff created successfully', staff });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find({ available: true });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createStaff, getStaff };