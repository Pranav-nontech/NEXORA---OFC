const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  service: { type: String, required: true },
  staff: { type: String, required: true },
  time: { type: String, required: true },
  customerInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String
  }
});

module.exports = mongoose.model('Booking', bookingSchema);