// ===================
// IMPORT DEPENDENCIES
// ===================
const asyncHandler = require('express-async-handler');

// Import models
const User = require('../models/userModel');
const { Ingredient } = require('../models/ingredientModel');

// =====================
// CREATE HELPER METHODS
// =====================
// Error handling if no data is passed into the body
function handleEmptyBody(req, res) {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error(
      'Please submit all required recipe properties in the body of the request'
    );
  }
}

// =============================
// CREATE LOGIC FOR HTTP METHODS
// =============================

/**
 * @desc    Add a new ingredient to the db
 * @route   POST /api/users/ingredients
 * @access  Private
 */
const addIngredient = asyncHandler(async (req, res) => {
  // Error Handling if request body is empty
  handleEmptyBody(req, res);

  // Deconstruct body from request
  const { ingredientName, userId } = req.body;

  // Find the user in the DB
  const foundUser = await User.findById(userId);

  // Error Handling if the user does not exist
  if (!foundUser) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // Find the ingredient in the DB
  const foundIngredient = await Ingredient.findOne({ ingredientName });

  // Error Handling if the ingredient does not exist
  if (!foundIngredient) {
    res.status(400);
    throw new Error(`${ingredientName} not found in DB`);
  }

  // Check if the ingredient already exists in user's list
  foundUser.ingredients.forEach((ingredient) => {
    if (
      ingredient.ingredientName.toLowerCase() === ingredientName.toLowerCase()
    ) {
      res.status(409); // Conflict
      throw new Error(
        `${ingredientName} already exists in user's list of ingredients`
      );
    }
  });

  // Add the found ingredient to the user's list
  foundUser.ingredients.push(foundIngredient);
  const addIngredientSuccessful = await foundUser.save();

  if (addIngredientSuccessful) {
    res.status(201).json({
      message: `${ingredientName} added to user's ingredients list`,
    });
  } else {
    res.status(500);
    throw new Error(
      `Server Error: Problem saving ${ingredientName} to user's list of ingredients`
    );
  }
});

/**
 * @desc    Retrieve an ingredient of specified name from the db for given user
 * @route   GET /api/users/ingredients/:name
 * @access  Private
 */
const getIngredient = asyncHandler(async (req, res) => {
  // Error Handling if request body is empty
  handleEmptyBody(req, res);

  // Extract the ingredientName from the parameter
  const ingredientName = req.params.name;

  // Deconstruct body from request
  const { userId } = req.body;

  // Find the user in the DB
  const foundUser = await User.findById(userId);

  // Error Handling if the user does not exist
  if (!foundUser) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // Find the ingredient and return it
  for (const ingredient of foundUser.ingredients) {
    if (
      ingredient.ingredientName.toLowerCase() === ingredientName.toLowerCase()
    ) {
      return res.status(200).json({ ingredient });
    }
  }

  // Error handling if the ingredient was not found in the user's list
  res.status(400);
  throw new Error(
    `${ingredientName} could not be found in user's list of ingredients`
  );
});

/**
 * @desc    Retrieve all ingredients from the db for given user
 * @route   GET /api/users/ingredients
 * @access  Private
 */
const getAllIngredients = asyncHandler(async (req, res) => {
  // Deconstruct body from request
  const { userId } = req.body;

  // Find the user in the DB
  const foundUser = await User.findById(userId);

  // Error Handling if the user does not exist
  if (!foundUser) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // Check if the user's ingredients list is empty
  if (foundUser.ingredients.length === 0) {
    res.status(400);
    throw new Error('User does not have any ingredients yet');
  }
  res.status(200).json(foundUser.ingredients);
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

/**
 * @desc    Delete an ingredient of specified name from the db for given user
 * @route   DELETE /api/users/ingredients/:name
 * @access  Private
 */
const deleteIngredient = asyncHandler(async (req, res) => {
  // Error Handling if request body is empty
  handleEmptyBody(req, res);

  // Extract the ingredientName from the parameter
  const ingredientName = req.params.name;

  // Deconstruct body from request
  const { userId } = req.body;

  // Find the user in the DB
  const foundUser = await User.findById(userId);

  // Error Handling if the user does not exist
  if (!foundUser) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // Find the ingredient and remove it
  let removedIngredient = [];
  for (let i = 0; i < foundUser.ingredients.length; i++) {
    if (
      foundUser.ingredients[i].ingredientName.toLowerCase() ===
      ingredientName.toLowerCase()
    ) {
      try {
        removedIngredient = foundUser.ingredients.splice(i, 1);
        console.log(removedIngredient);
        await foundUser.save();
        break;
      } catch (error) {
        req.status(500);
        throw new Error(error);
      }
    }
  }

  // Error Handling if ingredient was not found
  if (removedIngredient.length === 0) {
    res.status(404);
    throw new Error(
      `${ingredientName} could not be found in user's list of ingredients`
    );
  }

  res.status(200).json({
    message: `${ingredientName} removed from user's list of ingredients`,
    removedIngredient: removedIngredient[0],
  });
});

/**
 * @desc    Delete all ingredients from the db for given user
 * @route   DELETE /api/users/ingredients
 * @access  Private
 */
const deleteAllIngredients = asyncHandler(async (req, res) => {
  // Error Handling if request body is empty
  handleEmptyBody(req, res);

  // Deconstruct body from request
  const { userId } = req.body;

  // Find the user in the DB
  const foundUser = await User.findById(userId);

  // Error Handling if the user does not exist
  if (!foundUser) {
    res.status(400);
    throw new Error('User does not exist');
  }

  // Set the user's ingredients array to an empty array
  foundUser.ingredients = [];
  const removedAllIngredients = await foundUser.save();

  // Error Handling if await fails
  if (removedAllIngredients.ingredients.length != 0) {
    res.status(500);
    throw new Error('Unable to remove all ingredients');
  }

  res.status(200).json({ message: "All Ingredients Removed from User's List" });
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
