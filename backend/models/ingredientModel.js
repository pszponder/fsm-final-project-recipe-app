// ===================
// IMPORT DEPENDENCIES
// ===================
const mongoose = require('mongoose');

// ===============================================================
// DEFINE SCHEMA (SHAPE) FOR THE ingredients COLLECTION IN MONGODB
// ===============================================================
const ingredientSchema = new mongoose.Schema(
  {
    ingredientName: {
      type: String,
      required: [true, 'Please enter the name of your ingredient'],
      unique: true,
      lowercase: true,
    },
    foodGroup: {
      type: String,
      required: [true, 'Please provide a food group for the ingredient'],
      lowercase: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Error linking user to ingredient'],
    },
  },
  {
    timestamps: true,
  }
);

// ====================================================================
// CREATE A MODEL BASED ON THE SCHEMA "ingredientsSchema" AND EXPORT IT
// ====================================================================
// The model is the interface mongoose will use to communicate
//  with the database collection for the specified document type (ingredients)
const Ingredient = mongoose.model('ingredient', ingredientSchema);
module.exports = Ingredient;
