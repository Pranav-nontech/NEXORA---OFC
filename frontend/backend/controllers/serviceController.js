const Service = require('../models/service');

const createService = async (req, res) => {
  const { name, duration, price } = req.body;

  try {
    if (req.user.accountType !== 'business') {
      return res.status(403).json({ message: 'Only business accounts can create services' });
    }

    const service = new Service({ name, duration, price });
    await service.save();
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createService, getServices };