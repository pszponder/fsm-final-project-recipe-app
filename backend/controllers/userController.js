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
      'Please submit all required properties in the body of the request'
    );
  }
}

// =============================
// CREATE LOGIC FOR HTTP METHODS
// =============================

/**
 * @desc    Add a list of ingredient Ids to the user's list of ingredients
 * @route   POST /api/users/ingredients
 * @access  Private
 */
const addIngredientById = asyncHandler(async (req, res) => {
  // Error Handling if request body is empty
  handleEmptyBody(req, res);

  // Extract userId from req
  const userId = req.userId;

  // Deconstruct body from request
  const { ingredientIds } = req.body;

  // Find the user in the DB
  const foundUser = await User.findById(userId).populate('ingredients');

  // Error Handling if the user does not exist
  if (!foundUser) {
    res.status(404);
    throw new Error('User does not exist');
  }

  // Add the array of ingredient Ids to the user's ingredients array
  for (const ingredientId of ingredientIds) {
    // Check that the ingredientId exists in the ingredients DB
    const foundIngredient = await Ingredient.findById(ingredientId);
    if (!foundIngredient) {
      res.status(404);
      throw new Error(`Ingredient with ID ${ingredientId} not found in DB`);
    }

    // Check whether or not the ingredient ID exists in the user's ingredients array
    const ingredientAlreadyExists = foundUser.ingredients.findIndex(
      (ingredient) => ingredient._id.equals(ingredientId)
    );

    if (ingredientAlreadyExists === -1) {
      // Push the id into the user's ingredients array
      foundUser.ingredients.push(ingredientId);
    }
  }

  // Update the user in the DB with the ingredients array
  const updatedFoundUser = await foundUser.save();
  if (!updatedFoundUser) {
    res.status(500);
    throw new Error(
      `Server Error: Problem saving Ingredient ID ${ingredientId} to user's list of ingredients`
    );
  } else {
    res.status(200).json({
      message:
        "Successfully saved new ingredients into user's list of ingredients",
    });
  }
});

/**
 * @desc    Retrieve all ingredients from the users list of ingredients
 * @route   GET /api/users/ingredients
 * @access  Private
 */
const getAllIngredients = asyncHandler(async (req, res) => {
  // Extract userId from req
  const userId = req.userId;

  // Find the user in the DB
  const foundUser = await User.findById(userId).populate('ingredients');

  // Error Handling if the user does not exist
  if (!foundUser) {
    res.status(404);
    throw new Error('User does not exist');
  }

  // Check if the user's ingredients list is empty
  if (foundUser.ingredients.length === 0) {
    // res.status(404);
    // throw new Error('User does not have any ingredients yet');
    return res.status(200).json([]);
  }
  res.status(200).json(foundUser.ingredients);
});

/**
 * @desc    Update user's ingredient list with a new list of ingredient Ids
 * @route   PUT /api/users/ingredients
 * @access  Private
 */
const updateIngredientsById = asyncHandler(async (req, res) => {
  // Error Handling if request body is empty
  handleEmptyBody(req, res);

  // Extract userId from req
  const userId = req.userId;

  // Deconstruct body from request
  const { ingredientIds } = req.body;

  // Find the user in the DB
  const foundUser = await User.findById(userId).populate('ingredients');

  // Error Handling if the user does not exist
  if (!foundUser) {
    res.status(404);
    throw new Error('User does not exist');
  }

  // Replace user's current list of ingredients with passed in array of ingredients
  foundUser.ingredients = ingredientIds;

  // Update the user in the DB with the ingredients array
  const updatedFoundUser = await foundUser.save();

  if (!updatedFoundUser) {
    res.status(500);
    throw new Error(
      `Server Error: Problem saving Ingredient ID ${ingredientId} to user's list of ingredients`
    );
  } else {
    res.status(200).json({
      message:
        "Successfully saved new ingredients into user's list of ingredients",
    });
  }
});

/**
 * @desc    Delete an ingredient of specified id from the user's ingredients list
 * @route   DELETE /api/users/ingredients/:ingredientId
 * @access  Private
 */
const deleteIngredientById = asyncHandler(async (req, res) => {
  // Extract userId from req
  const userId = req.userId;

  // Extract the ingredientId from the parameter
  const ingredientId = req.params.ingredientId;

  // Find the user in the DB
  const foundUser = await User.findById(userId).populate('ingredients');

  // Error Handling if the user does not exist
  if (!foundUser) {
    res.status(404);
    throw new Error('User does not exist');
  }

  // Locate the index of the ingredientId in the user's list of ingredients
  const ingredientIndex = foundUser.ingredients.findIndex((ingredient) =>
    ingredient._id.equals(ingredientId)
  );

  // If the ingredient is not found, return an error
  if (ingredientIndex === -1) {
    res.status(404);
    throw new Error(
      `IngredientId ${ingredientId} not found in user's ingredients list`
    );
  }

  // Remove the ingredient at ingredientIndex
  let removedIngredient = [];
  try {
    removedIngredient = foundUser.ingredients.splice(ingredientIndex, 1);
    await foundUser.save();
  } catch (error) {
    req.status(500);
    throw new Error(error);
  }

  res.status(200).json({
    message: `Ingredient ID ${ingredientId} removed from user's list of ingredients`,
    removedIngredient: removedIngredient[0],
  });
});

/**
 * @desc    Delete all ingredients from the db for given user
 * @route   DELETE /api/users/ingredients
 * @access  Private
 */
const deleteAllIngredientsById = asyncHandler(async (req, res) => {
  // Extract userId from req
  const userId = req.userId;

  // Find the user in the DB
  const foundUser = await User.findById(userId);

  // Error Handling if the user does not exist
  if (!foundUser) {
    res.status(404);
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
  addIngredientById,
  getAllIngredients,
  updateIngredientsById,
  deleteIngredientById,
  deleteAllIngredientsById,
};
