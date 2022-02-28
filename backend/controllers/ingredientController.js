// ===================
// IMPORT DEPENDENCIES
// ===================
const asyncHandler = require('express-async-handler');

// Import models
const Ingredient = require('../models/ingredientModel');

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
 * @route   POST /api/ingredients
 * @access  Private
 */
const addIngredient = asyncHandler(async (req, res) => {
  // Error handling if no data is passed into the body
  handleEmptyBody(req, res);

  // Destructure body data
  const { ingredientName, foodGroup } = req.body;

  // Find the ingredient in the DB (if it exists)
  const foundIngredient = await Ingredient.findOne({ ingredientName });

  // If ingredient does not exist, add it to the DB
  if (!foundIngredient) {
    await Ingredient.create({
      ingredientName,
      foodGroup,
    });
    res.status(201).json({
      message: `${ingredientName} added to Ingredients in DB`,
    });
  }
  // If recipe exists, return an error
  else {
    res.status(409);
    throw new Error(`${ingredientName} already exists in DB`);
  }
});

/**
 * @desc    Retrieve an ingredient of specified name from the db for given user
 * @route   GET /api/ingredients/:name
 * @access  Private
 */
const getIngredient = asyncHandler(async (req, res) => {
  // Extract the ingredientName from the parameter
  const ingredientName = req.params.name;

  // Find the ingredient
  const foundIngredient = await Ingredient.findOne({ ingredientName });

  // If recipe exists, return it in the request
  if (foundIngredient) {
    res.status(200).json(foundIngredient);
  }
  // If recipe not found, return an error
  else {
    res.status(404);
    throw new Error(`Could not find ${ingredientName} recipe in DB`);
  }
});

/**
 * @desc    Retrieve all ingredients from the db for given user
 * @route   GET /api/ingredients
 * @access  Private
 */
const getAllIngredients = asyncHandler(async (req, res) => {
  // Find all ingredients
  const allIngredients = await Ingredient.find({});

  // If async call to get all ingredients is successful, return it in response
  if (allIngredients) {
    res.status(200).json(allIngredients);
  }
  // If error occurs when trying to retrieve data from DB
  else {
    res.status(500);
    throw new Error(`Error retrieving data from DB`);
  }
});

/**
 * @desc    Update an ingredient of specified name from the db for given user
 * @route   PUT /api/ingredients/:name
 * @access  Private
 */
const updateIngredient = asyncHandler(async (req, res) => {
  // Error handling if no data is passed into the body
  handleEmptyBody(req, res);

  // Error handling if no path variable passed into request URL
  if (req.params.name === '') {
    res.status(400);
    throw new Error('Please enter the name of the ingredient to update');
  }

  // Extract variables from request
  const ingredientName = req.params.name;
  const newIngredientName = req.body.ingredientName;
  const newFoodGroup = req.body.foodGroup;

  // Error handling if the new ingredient name already exists in DB
  const foundNewIngredient = await Ingredient.findOne({
    ingredientName: newIngredientName,
  });
  if (foundNewIngredient) {
    res.status(409);
    throw new Error(`${newIngredientName} already exists in DB`);
  }

  // Find and update the Ingredient
  const updatedIngredient = await Ingredient.findOneAndReplace(
    { ingredientName },
    {
      ingredientName: newIngredientName,
      foodGroup: newFoodGroup,
    }
  );

  // If async call to update ingredients is successful, return it in response
  if (updatedIngredient) {
    res.status(200).json({
      message: `Successfully updated ${ingredientName}`,
    });
  } else {
    res.status(404);
    throw new Error(`Could not find ${recipeName} recipe in DB`);
  }
});

/**
 * @desc    Delete an ingredient of specified name from the db for given user
 * @route   DELETE /api/ingredients/:name
 * @access  Private
 */
const deleteIngredient = asyncHandler(async (req, res) => {
  // Extract ingredientName from request
  const ingredientName = req.params.name;

  // Attempt to remove the Ingredient
  const removedIngredient = await Ingredient.findOneAndRemove({
    ingredientName,
  });

  // Remove the Ingredient from the DB
  if (removedIngredient) {
    res.status(200).json({
      message: `${ingredientName} removed from DB`,
    });
  } else {
    res.status(404);
    throw new Error(`${ingredientName} not found in DB`);
  }
});

/**
 * @desc    Delete all ingredients from the db for given user
 * @route   DELETE /api/ingredients
 * @access  Private
 */
const deleteAllIngredients = asyncHandler(async (req, res) => {
  const deleted = await Ingredient.deleteMany({});

  if (deleted) {
    res.status(200).json({ message: 'All Ingredients deleted' });
  } else {
    res.status(500);
    throw new Error('Error removing Ingredients from DB');
  }
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
