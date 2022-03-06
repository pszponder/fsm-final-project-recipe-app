// ===================
// IMPORT DEPENDENCIES
// ===================
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Import "User" model
const User = require('../models/userModel');

// ============================================================
// DEFINE MIDDLEWARE TO HANDLE VERIFICATION OF JWT ACCESS TOKEN
// ============================================================
const verifyJWTAccessToken = asyncHandler(async (req, res, next) => {
  // Extract the authorization header which should include the access token
  const authHeader = req.headers.authorization;

  // Return error if no authorization header attached to the request
  if (!authHeader) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  // Extract the JWT Access Token from the header (In the form of "Bearer accessToken")
  const accessToken = authHeader.split(' ')[1];

  // Verify the accessToken is correct
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decodedAccessToken) => {
      // Throw an error if the refresh token from the response is incorrect
      if (err) {
        res.status(403);
        throw new Error('Forbidden: Invalid Access Token');
      }

      // Pass the user id extracted from the access token into the request
      req.userId = decodedAccessToken.id;
    }
  );

  next();
});

module.exports = { verifyJWTAccessToken };
