// =============================
// IMPORT AND SETUP DEPENDENCIES
// =============================

const express = require('express');
const router = express.Router(); // Instantiate router
const { registerUser, loginUser } = require('../controllers/authController');

// ==============================
// SETUP ROUTES WITH HTTP METHODS
// ==============================
router.post('/register', registerUser);
router.post('/login', loginUser);

// =============
// EXPORT ROUTER
// =============
module.exports = router;
