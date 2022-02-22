// ===================
// IMPORT DEPENDENCIES
// ===================
const mongoose = require('mongoose');

// ===========================================================
// DEFINE SCHEMA (SHAPE) FOR THE recipes COLLECTION IN MONGODB
// ===========================================================
const recipesSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: [true, 'Please enter the name of your recipe'],
      unique: true,
      lowercase: true,
    },
    recipeDescription: {
      type: String,
      required: [true, 'Please enter a description for your recipe'],
    },
    recipeDirections: {
      type: [String],
      required: [true, 'Please enter directions for your recipe'],
    },
    recipeIngredients: {
      type: [
        {
          ingredientName: {
            type: String,
            required: [true, 'Please enter the name of the ingredient'],
            lowercase: true,
          },
          ingredientQty: {
            type: Number,
            required: [true, 'Please enter the required qty of the ingredient'],
          },
          ingredientUnitOfMeasurement: {
            type: String,
            required: [
              true,
              'Please enter the unit of measurement for the ingredient',
            ],
            lowercase: true,
          },
        },
      ],
      required: [true, 'Please enter a list of ingredients'],
    },
  },
  {
    timestamps: true,
  }
);

// ====================================================================
// CREATE A MODEL BASED ON THE SCHEMA "recipesSchema" AND EXPORT IT
// ====================================================================
// The model is the interface mongoose will use to communicate
//  with the database collection for the specified document type (recipes)
const Recipes = mongoose.model('recipe', recipesSchema);
module.exports = Recipes;
