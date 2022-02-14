// =============================
// IMPORT AND SETUP DEPENDENCIES
// =============================

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require('../controllers/userController');

// ==============================
// SETUP ROUTES WITH HTTP METHODS
// ==============================
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/user', getUser);

// =============
// EXPORT ROUTER
// =============
module.exports = router;
