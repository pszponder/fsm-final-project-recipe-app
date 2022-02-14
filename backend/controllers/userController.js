// ===================
// IMPORT DEPENDENCIES
// ===================
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Import "User" model
const User = require('../models/userModel');

// =============================
// CREATE LOGIC FOR HTTP METHODS
// =============================

/**
 * @desc    Register new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    // Destructure body data
    const { fistName, lastName, email, password } = req.body;

    res
      .status(201)
      .json({ message: 'Register User', fistName, lastName, email, password });
  } catch (error) {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

/**
 * @desc    Authenticate a user
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    // Destructure body data
    const { email, password } = req.body;

    res.status(201).json({ message: 'User logged in', email, password });
  } catch (error) {
    res.status(400);
    throw new Error('Invalid login credentials');
  }
};

/**
 * @desc    Get user data
 * @route   GET /api/users/user
 * @access  Private
 */
const getUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'User data retrieved' });
  } catch (error) {
    res.status(404);
    throw new Error('User not found');
  }
};

// =========================
// EXPORT CONTROLLER METHODS
// =========================

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
