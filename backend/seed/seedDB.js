// ===========================
// IMPORT DATA FROM SEED FILES
// ===========================
const ingredientsArray = require('./dataIngredients');
const recipesArray = require('./dataRecipes');

// ======================
// IMPORT MONGOOSE MODELS
// ======================
const Ingredient = require('../models/ingredientModel');
const Recipe = require('../models/recipeModel');

// ===========================
// SETUP CONNECTION TO MONGODB
// ===========================
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const mongoose = require('mongoose');
dotenv.config(); // Load .env file contents into process.env.

// ==============
// SEED THE FILES
// ==============

// Function to perform seeding operations
const seedDB = async () => {
  // ---------------------------
  // SEED Ingredients Collection
  // ---------------------------
  console.log('Seeding Ingredients collection...');

  // Delete all objects currently in the Ingredients collection
  await Ingredient.deleteMany({});

  // Insert all objects from ingredientsArray into Ingredients collection
  await Ingredient.insertMany(ingredientsArray);

  console.log('Seeding Ingredients collection COMPLETE.\n');

  // -----------------------
  // SEED Recipes Collection
  // -----------------------
  console.log('Seeding Recipes collection...');
  // Delete all objects currently in the Recipes collection
  await Recipe.deleteMany({});

  // Insert all objects from recipesArray into Recipes collection
  await Recipe.insertMany(recipesArray);

  console.log('Seeding Recipes collection COMPLETE.\n');
};

// Connect to the DB
connectDB().then(() => {
  // Seed the Collections in the DB and then close the connection to the DB
  seedDB().then(() => {
    console.log('Closing connection to DB...');
    mongoose.connection.close();
  });
});
