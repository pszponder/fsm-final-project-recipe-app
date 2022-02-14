const mongoose = require('mongoose');

// ========================================================
// DEFINE SCHEMA (SHAPE) FOR THE user COLLECTION IN MONGODB
// ========================================================
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add your last name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

// ========================================================
// COMPILE A MODEL USING THE SCHEMA AS "User" AND EXPORT IT
// ========================================================
module.exports = mongoose.model('User', userSchema);
