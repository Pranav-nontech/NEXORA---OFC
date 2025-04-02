const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Service = require('./models/service');
const Staff = require('./models/staff');

const seedData = async () => {
  await connectDB();

  await Service.deleteMany({});
  await Staff.deleteMany({});

  const services = [
    { name: 'Haircut', duration: 30, price: 25 },
    { name: 'Massage', duration: 60, price: 50 }
  ];
  const staff = [
    { name: 'Jane Doe', role: 'Senior Stylist', bio: '10+ years experience' },
    { name: 'John Smith', role: 'Massage Therapist', bio: 'Deep tissue expert' }
  ];

  await Service.insertMany(services);
  await Staff.insertMany(staff);

  console.log('Data seeded');
  process.exit();
};

seedData();