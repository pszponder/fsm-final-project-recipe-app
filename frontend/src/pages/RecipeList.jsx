import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import DataContext from '../context/DataProvider';

function RecipeList() {
  // Extract the state and setter shared from the DataContext
  const { recipeList, setRecipeList } = useContext(DataContext);

  // Call the API to extract recipe list on component load
  //  (pass in empty array as 2nd argument)
  useEffect(() => {
    const getAllRecipes = async () => {
      try {
        const response = await axios.get('/api/recipes');

        // Update the recipeList
        setRecipeList(response.data);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };

    getAllRecipes();
  }, []);

  return (
    <div>
      {/* RECIPE LIST */}
      <section>
        <h2>RECIPES LIST</h2>
        <ul>
          {recipeList.map((recipe) => (
            <li key={recipe._id}>
              <h4>{recipe.recipeName}</h4>
              <p>{recipe.recipeDescription}</p>
              <p>{recipe._id}</p>
              <button>View Recipe</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default RecipeList;
