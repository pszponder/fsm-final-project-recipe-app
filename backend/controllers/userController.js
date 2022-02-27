// ===================
// IMPORT DEPENDENCIES
// ===================
const asyncHandler = require('express-async-handler');

// Import models
const User = require('../models/userModel');
const Ingredient = require('../models/ingredientModel');

// =====================
// CREATE HELPER METHODS
// =====================

// =============================
// CREATE LOGIC FOR HTTP METHODS
// =============================

// TODO: ADD BASE LOGIC
// TODO: COMPLETE ENTIRE LOGIC
/**
 * @desc    Add a new ingredient to the db
 * @route   POST /api/users/ingredients
 * @access  Private
 */
const addIngredient = asyncHandler(async (req, res) => {
  // Error Handling if request body is empty

  // Deconstruct body from request
  const { ingredientName, foodGroup, user } = req.body;

  // Find the user in the DB
  const foundUser = await User.findById(user._id);

  // Error Handling if the user does not exist

  res.status(201).json({
    message: 'Ingredient Added',
    ingredientName: ingredientName,
    foodGroup: foodGroup,
  });
});

// TODO: ADD BASE LOGIC
// TODO: COMPLETE ENTIRE LOGIC
/**
 * @desc    Retrieve an ingredient of specified name from the db for given user
 * @route   GET /api/users/ingredients/:name
 * @access  Private
 */
const getIngredient = asyncHandler(async (req, res) => {
  const ingredientName = req.params.name;
  res.status(200).json({ message: `Ingredient retrieved`, ingredientName });
});

// TODO: ADD BASE LOGIC
// TODO: COMPLETE ENTIRE LOGIC
/**
 * @desc    Retrieve all ingredients from the db for given user
 * @route   GET /api/users/ingredients
 * @access  Private
 */
const getAllIngredients = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'All ingredients retrieved' });
});

// TODO: ADD BASE LOGIC
// TODO: COMPLETE ENTIRE LOGIC
/**
 * @desc    Update an ingredient of specified name from the db for given user
 * @route   PUT /api/users/ingredients/:name
 * @access  Private
 */
const updateIngredient = asyncHandler(async (req, res) => {
  const ingredientName = req.params.name;
  const newIngredientName = req.body.ingredientName;
  const newFoodGroup = req.body.foodGroup;

  res.status(200).json({
    message: `Ingredient updated: ${ingredientName}`,
    newIngredientName,
    newFoodGroup,
  });
});

// TODO: ADD BASE LOGIC
// TODO: COMPLETE ENTIRE LOGIC
/**
 * @desc    Delete an ingredient of specified name from the db for given user
 * @route   DELETE /api/users/ingredients/:name
 * @access  Private
 */
const deleteIngredient = asyncHandler(async (req, res) => {
  const ingredientName = req.params.name;
  res.status(200).json({ message: `Ingredient deleted`, ingredientName });
});

// TODO: ADD BASE LOGIC
// TODO: COMPLETE ENTIRE LOGIC
/**
 * @desc    Delete all ingredients from the db for given user
 * @route   DELETE /api/users/ingredients
 * @access  Private
 */
const deleteAllIngredients = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'All Ingredients deleted' });
});

// =========================
// EXPORT CONTROLLER METHODS
// =========================

module.exports = {
  addIngredient,
  getIngredient,
  getAllIngredients,
  updateIngredient,
  deleteIngredient,
  deleteAllIngredients,
};
