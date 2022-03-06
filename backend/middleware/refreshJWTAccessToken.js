// ===================
// IMPORT DEPENDENCIES
// ===================
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Import "User" model
const User = require('../models/userModel');

// Import Constants to be used in tokens
const { MAX_AGE_ACCESS_TOKEN } = require('../config/constants');

// ===========================================================
// DEFINE REFRESH TOKEN MIDDLEWARE TO REFRESH THE ACCESS TOKEN
// ===========================================================

const refreshJWTAccessToken = asyncHandler(async (req, res, next) => {
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

      // Pass the new access token into the authorization headers in the request
      req.headers.authorization = `Bearer ${newAccessToken}`;
    }
  );
  next();
});

// =================
// EXPORT MIDDLEWARE
// =================
module.exports = { refreshJWTAccessToken };
