// ===================
// IMPORT DEPENDENCIES
// ===================
const allowedOrigins = require('./allowedOrigins');

// ===============================
// CONFIGURE A CORS OPTIONS OBJECT
// ===============================
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionSuccessStatus: 200,
};

// ==============================
// EXPORT THE CORS OPTIONS OBJECT
// ==============================
module.exports = corsOptions;
