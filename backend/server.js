// ===================
// IMPORT DEPENDENCIES
// ===================

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Custom Middleware
const { errorHandler } = require('./middleware/errorHandler');

// ==========================
// LOAD ENVIRONMENT VARIABLES
// ==========================
dotenv.config(); // Load .env file contents into process.env.

// =======================================
// INITIALIZE CONNECTION TO MONGODB SERVER
// =======================================
connectDB();

// ==================
// INITIALIZE EXPRESS
// ==================
const app = express();

// ==============================================
// INITIALIZE 3rd PARTY NODE MODULES / MIDDLEWARE
// ==============================================

// Middleware to parse JSON or urlencoded payloads from body data in request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// =====================
// SETUP ROUTE ENDPOINTS
// =====================
// app.use('/api/users', require('./routes/userRoutes'));

// ======================================
// INITIALIZE CUSTOM MODULES / MIDDLEWARE
// ======================================

// Overwrite Node's error handling
app.use(errorHandler);

// ======================================
// ESTABLISH PORT FOR SERVER TO LISTEN ON
// ======================================
const PORT = process.env.PORT || 5000;

// ==============
// LISTEN TO PORT
// ==============
app.listen(PORT, () => console.log(`Server listening on port ${PORT} ...`));
