const dotenv = require('dotenv');

dotenv.config();

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'PORT'];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is missing`);
  }
});

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 5000,
};