// =============================
// IMPORT AND SETUP DEPENDENCIES
// =============================

const express = require('express');
const router = express.Router(); // Instantiate router
const {
  addIngredientById,
  getAllIngredients,
  deleteIngredientById,
  deleteAllIngredientsById,
} = require('../controllers/userController');

// ==============================
// SETUP ROUTES WITH HTTP METHODS
// ==============================

// POST
router.post('/ingredients', addIngredientById);

// GET
router.get('/ingredients', getAllIngredients);

// DELETE
router.delete('/ingredients/:ingredientId', deleteIngredientById);
router.delete('/ingredients', deleteAllIngredientsById);

// =============
// EXPORT ROUTER
// =============
module.exports = router;
