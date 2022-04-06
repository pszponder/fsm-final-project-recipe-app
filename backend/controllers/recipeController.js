// ===================
// IMPORT DEPENDENCIES
// ===================
const asyncHandler = require('express-async-handler');

// Import models
const Recipe = require('../models/recipeModel');

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
 * @desc    Add a new recipe to the db
 * @route   POST /api/recipes
 * @access  Private
 */
const addRecipe = asyncHandler(async (req, res) => {
  // Error handling if no data is passed into the body
  handleEmptyBody(req, res);

  // Destructure body data
  const { recipeName, recipeDescription, recipeDirections, recipeIngredients } =
    req.body;

  // Find the recipe in the DB (if it exists)
  const foundRecipe = await Recipe.findOne({ recipeName });

  // If recipe does not exist, add it to the DB
  if (!foundRecipe) {
    await Recipe.create({
      recipeName,
      recipeDescription,
      recipeDirections,
      recipeIngredients,
    });
    res.status(201).json({
      message: `${recipeName} added to Recipes in DB`,
    });
  }
  // If recipe exists, return an error
  else {
    res.status(409);
    throw new Error(`${recipeName} already exists in DB`);
  }
});

/**
 * @desc    Retrieve a recipe of specified name
 * @route   GET /api/recipes/:name
 * @access  Private
 */
const getRecipe = asyncHandler(async (req, res) => {
  // Extract the recipeName from the parameter
  const recipeName = req.params.name;

  // Find the recipe
  const foundRecipe = await Recipe.findOne({ recipeName });

  // If recipe exists, return it in the request
  if (foundRecipe) {
    res.status(200).json(foundRecipe);
  }
  // If recipe not found, return an error
  else {
    res.status(404);
    throw new Error(`Could not find ${recipeName} recipe in DB`);
  }
});

/**
 * @desc    Retrieve all recipes
 * @route   GET /api/recipes
 * @access  Private
 */
const getAllRecipes = asyncHandler(async (req, res) => {
  // Find all recipes
  const allRecipes = await Recipe.find({});

  // If async call to get all recipes is successful, return it in response
  if (allRecipes) {
    res.status(200).json(allRecipes);
  }
  // If error occurs when trying to retrieve data from DB
  else {
    res.status(500);
    throw new Error(`Error retrieving data from DB`);
  }
});

/**
 * @desc    Update a recipe of specified name
 * @route   PUT /api/recipes/:name
 * @access  Private
 */
const updateRecipe = asyncHandler(async (req, res) => {
  // Error handling if no data is passed into the body
  handleEmptyBody(req, res);

  // Error handling if no path variable passed into request URL
  if (req.params.name === '') {
    res.status(400);
    throw new Error('Please enter the name of the recipe to update');
  }

  // Extract variables from request
  const recipeName = req.params.name;
  const newRecipeName = req.body.recipeName;
  const newRecipeDescription = req.body.recipeDescription;
  const newRecipeDirections = req.body.recipeDirections;
  const newRecipeIngredients = req.body.recipeIngredients;

  // Error handling if the new recipe name already exists in DB
  const foundNewRecipe = await Recipe.findOne({ recipeName: newRecipeName });
  if (foundNewRecipe) {
    res.status(409);
    throw new Error(`${newRecipeName} already exists in DB`);
  }

  // Find and update the recipe
  const updatedRecipe = await Recipe.findOneAndReplace(
    { recipeName },
    {
      recipeName: newRecipeName,
      recipeDescription: newRecipeDescription,
      recipeDirections: newRecipeDirections,
      recipeIngredients: newRecipeIngredients,
    }
  );

  // If async call to update recipes is successful, return it in response
  if (updatedRecipe) {
    res.status(200).json({
      message: `Successfully updated ${recipeName} recipe`,
    });
  } else {
    res.status(404);
    throw new Error(`Could not find ${recipeName} recipe in DB`);
  }
});

/**
 * @desc    Delete a recipe of specified name
 * @route   DELETE /api/recipes/:name
 * @access  Private
 */
const deleteRecipe = asyncHandler(async (req, res) => {
  // Extract recipeName from request
  const recipeName = req.params.name;

  // Attempt to remove the recipe
  const removedRecipe = await Recipe.findOneAndRemove({ recipeName });

  // Remove the recipe from the DB
  if (removedRecipe) {
    res.status(200).json({
      message: `${recipeName} removed from DB`,
    });
  } else {
    res.status(404);
    throw new Error(`${recipeName} not found in DB`);
  }
});

/**
 * @desc    Delete all recipes
 * @route   DELETE /api/recipes
 * @access  Private
 */
const deleteAllRecipes = asyncHandler(async (req, res) => {
  const deleted = await Recipe.deleteMany({});

  if (deleted) {
    res.status(200).json({ message: 'All recipes deleted' });
  } else {
    res.status(500);
    throw new Error('Error removing recipes from DB');
  }
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
