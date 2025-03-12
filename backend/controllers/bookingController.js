const Booking = require('../models/booking');
const Service = require('../models/service');
const Staff = require('../models/staff');

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching services', error: err });
  }
};

exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching staff', error: err });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('service staff');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    const populatedBooking = await Booking.findById(booking._id).populate('service staff');
    res.status(201).json(populatedBooking);
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err });
  }
};