// ===================
// IMPORT DEPENDENCIES
// ===================
const asyncHandler = require('express-async-handler');

// Import models
const Recipe = require('../models/recipeModel');

// =====================
// CREATE HELPER METHODS
// =====================

// =============================
// CREATE LOGIC FOR HTTP METHODS
// =============================

// TODO: ADD BASE LOGIC
// TODO: COMPLETE ENTIRE LOGIC
/**
 * @desc    Add a new recipe to the db
 * @route   POST /api/recipes
 * @access  Private
 */
const addRecipe = asyncHandler(async (req, res) => {
  const { recipeName, recipeDescription, recipeDirections, recipeIngredients } =
    req.body;
  res.status(201).json({
    message: 'Recipe Added',
    recipeName,
    recipeDescription,
    recipeDirections,
    recipeIngredients,
  });
});

// TODO: ADD BASE LOGIC
// TODO: COMPLETE ENTIRE LOGIC
/**
 * @desc    Retrive a recipe of specified name
 * @route   GET /api/recipes/:name
 * @access  Private
 */
const getRecipe = asyncHandler(async (req, res) => {
  const recipeName = req.params.name;
  res
    .status(200)
    .json({ message: `Recipie for ${recipeName} retrieved`, recipeName });
});

// TODO: ADD BASE LOGIC
// TODO: COMPLETE ENTIRE LOGIC
/**
 * @desc    Retrive all recipes
 * @route   GET /api/recipes
 * @access  Private
 */
const getAllRecipes = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'All recipes retrieved' });
});

// TODO: ADD BASE LOGIC
// TODO: COMPLETE ENTIRE LOGIC
/**
 * @desc    Update a recipe of specified name
 * @route   PUT /api/recipes/:name
 * @access  Private
 */
const updateRecipe = asyncHandler(async (req, res) => {
  const recipeName = req.params.name;
  const newRecipeName = req.body.recipeName;
  const newRecipeDescription = req.body.recipeDescription;
  const newRecipeDirections = req.body.recipeDirections;
  const newRecipeIngredients = req.body.recipeIngredients;

  res.status(200).json({
    message: `Recipe Updated: ${recipeName}`,
    newRecipeName,
    newRecipeDescription,
    newRecipeDirections,
    newRecipeIngredients,
  });
});

// TODO: ADD BASE LOGIC
// TODO: COMPLETE ENTIRE LOGIC
/**
 * @desc    Delete a recipe of specified name
 * @route   DELETE /api/recipes/:name
 * @access  Private
 */
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipeName = req.params.name;
  res.status(200).json({ message: `Ingredient deleted`, recipeName });
});

// TODO: ADD BASE LOGIC
// TODO: COMPLETE ENTIRE LOGIC
/**
 * @desc    Delete all recipes
 * @route   DELETE /api/recipes
 * @access  Private
 */
const deleteAllRecipes = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'All recipes deleted' });
});

// =========================
// EXPORT CONTROLLER METHODS
// =========================

module.exports = {
  addRecipe,
  getRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  deleteAllRecipes,
};
