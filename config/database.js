const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // No deprecated options needed in Mongoose 6.x
      // Options are now defaulted to use the new server discovery and monitoring engine
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
