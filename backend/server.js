// ===================
// IMPORT DEPENDENCIES
// ===================

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Custom Middleware
const { errorHandler } = require('./middleware/errorHandler');
// const { verifyJWTRefreshToken } = require('./middleware/verifyJWTRefreshToken'); // TODO REMOVE
const { verifyJWTAccessToken } = require('./middleware/verifyJWTAccessToken');

const corsOptions = require('./config/corsOptions');
const setCorsCredentials = require('./middleware/setCorsCredentials');

// ==========================
// LOAD ENVIRONMENT VARIABLES
// ==========================
dotenv.config(); // Load .env file contents into process.env

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

// Middleware to parse cookie data
app.use(cookieParser());

// Set request header credentials for CORS if request if from approved list
app.use(setCorsCredentials);
app.use(cors(corsOptions)); // Enable CORS and pass in CORS configuration object

// =====================
// SETUP ROUTE ENDPOINTS
// =====================
// Route to handle authorization (register, login, logout)
app.use('/api/auth', require('./routes/authRoutes'));

// Handle JWT Access and Refresh Tokens
// app.use(verifyJWTRefreshToken); // If we have a valid Refresh Token, Continue
app.use(verifyJWTAccessToken); // If we have authorization, Continue

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/ingredients', require('./routes/ingredientRoutes'));
app.use('/api/recipes', require('./routes/recipeRoutes'));

// ==============
// ERROR HANDLING
// ==============
// Overwrite Default ExpressJS error handling with custom middleware
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
