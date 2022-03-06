// =============================
// IMPORT AND SETUP DEPENDENCIES
// =============================

const express = require('express');
const router = express.Router(); // Instantiate router
const {
  registerUser,
  loginUser,
  logoutUser,
  handleRefreshToken,
} = require('../controllers/authController');

// ==============================
// SETUP ROUTES WITH HTTP METHODS
// ==============================
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/refresh', handleRefreshToken);

// =============
// EXPORT ROUTER
// =============
module.exports = router;
