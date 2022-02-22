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
} = require('../controllers/ingredientController');

// ==============================
// SETUP ROUTES WITH HTTP METHODS
// ==============================

// POST
router.post('/', addIngredient);

// GET
router.get('/:name', getIngredient);
router.get('/', getAllIngredients);

// PUT
router.put('/:name', updateIngredient);

// DELETE
router.delete('/:name', deleteIngredient);
router.delete('/', deleteAllIngredients);

// =============
// EXPORT ROUTER
// =============
module.exports = router;
