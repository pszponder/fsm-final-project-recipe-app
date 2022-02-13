// IMPORT MONGOOSE DEPDENDENCY
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Establish a connection to the MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.mesage);
    process.exit(1); // Exit Node Process with an 'Uncaught Fatal Exception' Event Handler
  }
};

// EXPORT connectDB
module.exports = connectDB;
