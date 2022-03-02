// =============================
// IMPORT AND SETUP DEPENDENCIES
// =============================

const express = require('express');
const router = express.Router(); // Instantiate router
const {
  addIngredient,
  getIngredient,
  getAllIngredients,
  updateIngredient,
  deleteIngredient,
  deleteAllIngredients,
} = require('../controllers/userController');

// ==============================
// SETUP ROUTES WITH HTTP METHODS
// ==============================

// POST
router.post('/ingredients', addIngredient);

// GET
router.get('/ingredients/:name', getIngredient);
router.get('/ingredients', getAllIngredients);

// PUT
// router.put('/ingredients/:name', updateIngredient);

// DELETE
router.delete('/ingredients/:name', deleteIngredient);
router.delete('/ingredients', deleteAllIngredients);

// =============
// EXPORT ROUTER
// =============
module.exports = router;
