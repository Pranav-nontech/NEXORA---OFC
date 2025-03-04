const app = require('./app');
const connectDB = require('./config/db');
const { port } = require('./config/environment');

// Connect to MongoDB
connectDB();

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});