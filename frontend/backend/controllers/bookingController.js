const Booking = require('../models/booking');
const TimeSlot = require('../models/TimeSlot');
const Service = require('../models/service');
const Staff = require('../models/staff');

const createBooking = async (req, res) => {
  const { serviceId, staffId, timeSlotId, customerId } = req.body;

  try {
    if (req.user.accountType !== 'customer') {
      return res.status(403).json({ message: 'Only customers can create bookings' });
    }

    if (req.user.userId !== customerId) {
      return res.status(403).json({ message: 'You can only create bookings for yourself' });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    if (!staff.available) {
      return res.status(400).json({ message: 'Staff member is not available' });
    }

    const timeSlot = await TimeSlot.findById(timeSlotId);
    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }
    if (timeSlot.isBooked) {
      return res.status(400).json({ message: 'Time slot is already booked' });
    }
    if (timeSlot.staffId.toString() !== staffId) {
      return res.status(400).json({ message: 'Time slot does not belong to the selected staff' });
    }

    const expectedEndTime = new Date(new Date(timeSlot.startTime).getTime() + service.duration * 60000);
    if (expectedEndTime.getTime() !== new Date(timeSlot.endTime).getTime()) {
      return res.status(400).json({ message: 'Time slot duration does not match the service duration' });
    }

    const booking = new Booking({
      serviceId,
      staffId,
      timeSlot: timeSlot.startTime,
      customerId,
    });
    await booking.save();

    timeSlot.isBooked = true;
    await timeSlot.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.accountType === 'customer') {
      bookings = await Booking.find({ customerId: req.user.userId })
        .populate('serviceId')
        .populate('staffId');
    } else {
      const staff = await Staff.find();
      const staffIds = staff.map(s => s._id);
      bookings = await Booking.find({ staffId: { $in: staffIds } })
        .populate('serviceId')
        .populate('staffId')
        .populate('customerId');
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.customerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only cancel your own bookings' });
    }

    const timeSlot = await TimeSlot.findOne({
      staffId: booking.staffId,
      startTime: booking.timeSlot,
    });
    if (timeSlot) {
      timeSlot.isBooked = false;
      await timeSlot.save();
    }

    await Booking.deleteOne({ _id: bookingId });
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createBooking, getBookings, cancelBooking };