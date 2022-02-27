// ===================
// IMPORT DEPENDENCIES
// ===================
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// Import "User" model
const User = require('../models/userModel');

// =====================
// CREATE HELPER METHODS
// =====================
// TODO: CONSIDER MOVING THESE HELPER METHODS (and constants) TO THEIR OWN FILES (maybe put them in a utils folder?)
const MAX_AGE_ACCESS_TOKEN = '1d';
const MAX_AGE_REFRESH_TOKEN = '15s';

/**
 * Return a JTW Token based on a user id, a secret, and an expiration time
 * @param {*} id User id (from DB)
 * @param {*} secret JTW secret from .env file
 * @param {*} expirationTime expiration time of the JWT token (in seconds)
 * @returns JTW Token
 */
const createJTW = (id, secret, expirationTime) => {
  return jwt.sign({ id: id }, process.env[secret], {
    expiresIn: expirationTime,
  });
};

// =============================
// CREATE LOGIC FOR HTTP METHODS
// =============================

/**
 * @desc    Create a new user in the database
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  // Destructure body data
  const { firstName, lastName, email, password } = req.body;

  // Check if all data is entered
  if (!firstName) {
    res.status(400);
    throw new Error('Please enter a first name');
  } else if (!lastName) {
    res.status(400);
    throw new Error('Please enter a last name');
  } else if (!email) {
    res.status(400);
    throw new Error('Please enter an email');
  } else if (!password) {
    res.status(400);
    throw new Error('Please enter a password');
  }

  // Check if the user currently exists in the database by looking up their email
  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error('User already exists');
  }

  // TODO: ADD JWT LOGIC?
  // ! Maybe we don't need JWT LOGIC ON REGISTER, JUST AT LOGIN, WHEN USER REGISTERS, REDIRECT THEM TO THE LOGIN PAGE

  // Create an encrypted password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user in the database
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName,
      lastName,
      email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 * @desc    Authenticate an existing user
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  // Destructure body data
  const { email, password } = req.body;

  // Check if the user exists in db using their email
  const foundUser = await User.findOne({ email });

  // If the user was found, check that their password matches
  let correctPassword = false;
  if (foundUser) {
    correctPassword = await bcrypt.compare(password, foundUser.password);
  }

  // TODO: ADD JWT LOGIC

  // Create accessToken
  const accessToken = createJTW(
    foundUser._id,
    ACCESS_TOKEN_SECRET,
    MAX_AGE_ACCESS_TOKEN
  );

  // Create refreshToken
  const refreshToken = createJTW(
    foundUser._id,
    REFRESH_TOKEN_SECRET,
    MAX_AGE_REFRESH_TOKEN
  );

  // TODO: Add/update refresh token of the found user in the DB (need to add refreshToken into userModel)

  // Add the refresh token to a cookie and send it to the client (httpOnly cookie not available to JS)
  // TODO: Incorporate this after the email and password validation is completes in the if statement
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: MAX_AGE_REFRESH_TOKEN * 24 * 60 * 60 * 1000,
  });

  // Return access token to the client
  // TODO: Incorporate this after the email and password validation is completes in the if statement
  res.json({ accessToken });

  // If email and password are correct, grant user access to App
  if (foundUser && correctPassword) {
    res.status(201).json({
      message: `Logging in user: ${foundUser.firstName} ${foundUser.lastName}`,
      email,
      password,
      ingredients: foundUser.ingredients,
    });
  } else {
    res.status(400);
    throw new Error('Invalid login credentials');
  }
});

// TODO: CREATE A LOGOUT METHOD

// =========================
// EXPORT CONTROLLER METHODS
// =========================

module.exports = {
  registerUser,
  loginUser,
};
