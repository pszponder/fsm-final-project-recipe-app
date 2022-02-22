// =============================
// IMPORT AND SETUP DEPENDENCIES
// =============================

const express = require('express');
const router = express.Router(); // Instantiate router
const {
  addRecipe,
  getRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  deleteAllRecipes,
} = require('../controllers/recipeController');

// ==============================
// SETUP ROUTES WITH HTTP METHODS
// ==============================

// POST
router.post('/', addRecipe);

// GET
router.get('/:name', getRecipe);
router.get('/', getAllRecipes);

// PUT
router.put('/:name', updateRecipe);

// DELETE
router.delete('/:name', deleteRecipe);
router.delete('/', deleteAllRecipes);

// =============
// EXPORT ROUTER
// =============
module.exports = router;
