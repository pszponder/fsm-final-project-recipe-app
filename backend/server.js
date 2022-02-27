// ===================
// IMPORT DEPENDENCIES
// ===================

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

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
app.use('/api/users', require('./routes/authRoutes'));

// TODO: ADD JWT REFRESH TOKEN CHECK HERE (VIA CUSTOM MIDDLEWARE)
// TODO: ADD JWT ACCESS TOKEN AUTHORIZATION HERE (VIA CUSTOM MIDDLEWARE)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/ingredients', require('./routes/ingredientRoutes'));
app.use('/api/recipes', require('./routes/recipeRoutes'));

// ======================================
// INITIALIZE CUSTOM MODULES / MIDDLEWARE
// ======================================

// Overwrite Default ExpressJS error handling
app.use(errorHandler);

// ======================================
// ESTABLISH PORT FOR SERVER TO LISTEN ON
// ======================================
const PORT = process.env.PORT || 5000;

// ==============
// LISTEN TO PORT
// ==============
// Only start listening after connection to DB is established
mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
});
