const TimeSlot = require('../models/TimeSlot');
const Staff = require('../models/staff');

const createTimeSlot = async (req, res) => {
  const { staffId, startTime, endTime } = req.body;

  try {
    if (req.user.accountType !== 'business') {
      return res.status(403).json({ message: 'Only business accounts can create time slots' });
    }

    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    const overlappingSlots = await TimeSlot.find({
      staffId,
      $or: [
        { startTime: { $lt: new Date(endTime), $gte: new Date(startTime) } },
        { endTime: { $gt: new Date(startTime), $lte: new Date(endTime) } },
      ],
    });

    if (overlappingSlots.length > 0) {
      return res.status(400).json({ message: 'Time slot overlaps with an existing slot' });
    }

    const timeSlot = new TimeSlot({ staffId, startTime, endTime });
    await timeSlot.save();
    res.status(201).json({ message: 'Time slot created successfully', timeSlot });
  } catch (error) {
    console.error('Error creating time slot:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAvailableTimeSlots = async (req, res) => {
  const { staffId } = req.query;

  try {
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    const timeSlots = await TimeSlot.find({ staffId, isBooked: false });
    res.status(200).json(timeSlots);
  } catch (error) {
    console.error('Error fetching time slots:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTimeSlot, getAvailableTimeSlots };