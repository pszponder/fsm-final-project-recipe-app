// ===================
// IMPORT DEPENDENCIES
// ===================
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// Import "User" model
const User = require('../models/userModel');

// Import Constants to be used in tokens
const {
  MAX_AGE_ACCESS_TOKEN,
  MAX_AGE_REFRESH_TOKEN,
  MAX_AGE_REFRESH_TOKEN_COOKIE,
} = require('../config/constants');

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
    res.status(409);
    throw new Error('User already exists');
  }

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

  // Create Access and Refresh Tokens
  const accessToken = jwt.sign(
    { id: foundUser._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: MAX_AGE_ACCESS_TOKEN,
    }
  );

  const refreshToken = jwt.sign(
    { id: foundUser._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: MAX_AGE_REFRESH_TOKEN,
    }
  );

  // Update refresh token of the found user in the DB
  foundUser.refreshToken = refreshToken;
  const refreshTokenRefreshed = await foundUser.save();

  // Check that update of foundUser with refreshToken is successful
  if (Object.keys(refreshTokenRefreshed).length === 0) {
    res.status(500);
    throw new Error('Server Error: Unable to Refresh Token');
  }

  if (foundUser && correctPassword) {
    // If email and password are correct, grant user access to App
    res.status(201);

    // Add the refresh token to a cookie and send it to the client
    // httpOnly cookie prevents client-side scripts from accessing data (only the server can access it)
    // sameSite and secure are required to avoid cross-site response issue (this is when frontend and backend are hosted on different domains)
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: MAX_AGE_REFRESH_TOKEN_COOKIE,
    });

    // Add access token to the response (so that the client receives it)
    // ! CLIENT must store access token locally (local storage or app state)
    res.json({ accessToken });
  } else {
    res.status(401);
    throw new Error('Invalid login credentials');
  }
});

// TODO: REMOVE REFRESH HANDLER FROM CONTROLLER AND ADD IT TO MIDDLEWARE INSTEAD
/**
 * @desc    Returns a new JWT Access Token if Refresh Token is Valid
 * @route   GET /api/users/refresh
 * @access  Public
 */
const handleRefreshToken = asyncHandler(async (req, res) => {
  // Extract the cookies from the request
  const cookies = req.cookies;

  // Check if there are cookies and if a refresh jwt token is found in the cookie
  if (!cookies?.jwt) {
    res.status(401);
    throw new Error(
      'Unauthorized: Missing Refresh Cookie or Refresh Token in Cookie'
    );
  }

  // Extract the Refresh JWT Token from the Cookie
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken });

  // If the user is not found, return a 403 error
  if (!foundUser) {
    res.status(403);
    throw new Error(
      'Forbidden: Could not find user in DB with matching Refresh Token'
    );
  }

  // Validate the JWT Refresh Token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decodedRefreshToken) => {
      // Throw an error if the refresh token from the response is incorrect or the user's id doesn't match
      if (err || decodedRefreshToken.id !== foundUser._id.toString()) {
        res.status(403);
        throw new Error('Forbidden: Incorrect Access Token');
      }

      // If the token is valid, create a new Auth Token for the found user
      const newAccessToken = jwt.sign(
        { id: foundUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: MAX_AGE_ACCESS_TOKEN,
        }
      );

      // Pass the new access token into the controller response
      res.status(200).json({ newAccessToken });
    }
  );
});

/**
 * @desc    Removes the user's JWT Refresh Token from the DB
 * @route   GET /api/users/logout
 * @access  Public
 */
const logoutUser = asyncHandler(async (req, res) => {
  // ! CLIENT must delete access token on the front-end (local storage or app state)

  // Extract the cookies from the request
  const cookies = req.cookies;

  // Check if there are cookies and if a refresh jwt token is found in the cookie
  // Since we are logging out, if there aren't any cookies that's ok
  //  That means that we are already logged out
  if (!cookies?.jwt) {
    return res.status(204).json({ message: 'User already logged out' });
  }

  // Extract the Refresh JWT Token from the Cookie
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken });

  // If the user is not found but we still had a cookie, delete the cookie
  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      maxAge: MAX_AGE_REFRESH_TOKEN_COOKIE,
    });
    return res
      .status(204)
      .json({ message: 'No user found but removed refresh cookie' });
  }

  // Clear the refresh token from the user in the db
  foundUser.refreshToken = '';
  const clearedRefreshToken = await foundUser.save();

  if (!clearedRefreshToken) {
    res.status(500);
    throw new Error('Failed to clear refresh Token');
  }

  // Clear the cookie on the frontend
  // TODO: In production, add the secure: true to the object passed into clearCookie so that it only serves on https
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: MAX_AGE_REFRESH_TOKEN_COOKIE,
  });
  res.status(204).json({ message: 'User successfully logged out' });
});

// =========================
// EXPORT CONTROLLER METHODS
// =========================

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  handleRefreshToken,
};
