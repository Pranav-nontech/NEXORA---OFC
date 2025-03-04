const Booking = require('../models/booking');

exports.getServices = (req, res) => {
  // Replace hardcoded data with DB query later
  const services = [
    { id: 1, name: 'Haircut', duration: 30, price: 25 },
    { id: 2, name: 'Massage', duration: 60, price: 50 }
  ];
  res.json(services);
};

exports.createBooking = async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.status(201).json(booking);
};