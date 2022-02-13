// IMPORT AND LOAD ENVIRONMENT VARIABLES
const dotenv = require('dotenv');
dotenv.config(); // Load .env file contents into process.env.

// IMPORT AND INITIALIZE CONNECTION TO MONGODB SERVER
const connectDB = require('./config/db');
connectDB();

// IMPORT AND INITIALIZE EXPRESS
const express = require('express');
const app = express();

// IMPORT AND INITIALIZE 3rd PARTY NODE MODULES / MIDDLEWARE

// IMPORT AND INITIALIZE CUSTOM MODULES / MIDDLEWARE

// ESTABLISH PORT FOR SERVER TO LISTEN ON
const PORT = process.env.PORT || 5000;

// LISTEN TO PORT
app.listen(PORT, () => console.log(`Server listening on port ${PORT} ...`));
