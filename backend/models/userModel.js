// ===================
// IMPORT DEPENDENCIES
// ===================
const mongoose = require('mongoose');
const { isEmail } = require('validator');

// ========================================================
// DEFINE SCHEMA (SHAPE) FOR THE user COLLECTION IN MONGODB
// ========================================================
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your last name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email address'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Password must be 6 or more characters long'],
    },
    ingredients: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ingredient' }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// =============================================================
// CREATE A MODEL BASED ON THE SCHEMA "userSchema" AND EXPORT IT
// =============================================================
// The model is the interface mongoose will use to communicate
//  with the database collection for the specified document type (user)
const User = mongoose.model('user', userSchema);
module.exports = User;
