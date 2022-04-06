// ===================
// IMPORT DEPENDENCIES
// ===================
const allowedOrigins = require('../config/allowedOrigins');

// =====================================================================================================
// DECLARE MIDDLEWARE TO SET Access-Control-Allow-Credentials TO true IF REQUEST IS FROM AN APPROVED URI
// =====================================================================================================
const setCorsCredentials = (req, res, next) => {
  // Extract the origin of the request from the from request headers
  const origin = req.headers.origin;
  // console.log('running setCorsCredentials');
  // Check if the allowedOrigins array contains the origin extracted from the request
  // if it does, set the 'Access-Control-Allow-Credentials' to true in the header response
  if (allowedOrigins.includes(origin)) {
    // console.log('running setCorsCredentials IF STATEMENT');
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
};

// =================
// EXPORT MIDDLEWARE
// =================
module.exports = setCorsCredentials;
