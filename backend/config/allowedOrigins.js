// ==========================
// LOAD ENVIRONMENT VARIABLES
// ==========================
// const dotenv = require('dotenv');
// dotenv.config(); // Load .env file contents into process.env

// ===========================================
// DEFINE AN ARRAY OF URI FOR CORS PERMISSIONS
// ===========================================

// const allowedOrigins = [`http://localhost:${process.env.PORT}`];
const allowedOrigins = [`http://localhost:5000`];

// ========================
// EXPORT THE ARRAY OF URIs
// ========================
module.exports = allowedOrigins;
