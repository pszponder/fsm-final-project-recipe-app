import React, { useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import DataContext from '../context/DataProvider';

function RecipeList() {
  // Extract the state and setter shared from the DataContext
  const { loggedIn } = useContext(AuthContext);

  const { recipeList, setRecipeList, userIngredientList } =
    useContext(DataContext);

  // Create a navigate function to navigate to Recipe Detail
  const navigateRecipeDetail = useNavigate();

  // Create a function which will navigate to the Recipe Detail
  const handleClick = (recipe) => {
    navigateRecipeDetail('/recipe-detail', { state: recipe });
  };

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

  const matchRecipe = (recipe) => {
    // Extract the recipeIngredient names into an array
    const recipeIngredientNames = recipe.recipeIngredients.map(
      (ingredient) => ingredient.ingredientName
    );

    for (const recipeIngredientName of recipeIngredientNames) {
      for (const userIngredientName of userIngredientList) {
        console.log(recipeIngredientName, userIngredientName.ingredientName);
        if (recipeIngredientName === userIngredientName.ingredientName) {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <div>
      {loggedIn ? (
        <section>
          <h2>RECIPES LIST</h2>
          <ul>
            {recipeList.map((recipe) => {
              return matchRecipe(recipe) ? (
                <li key={recipe._id}>
                  <h4>{recipe.recipeName}</h4>
                  <p>{recipe.recipeDescription}</p>
                  <p>{recipe._id}</p>
                  <button onClick={() => handleClick(recipe)}>
                    View Recipe
                  </button>
                </li>
              ) : null;
            })}
          </ul>
        </section>
      ) : (
        <Navigate to="/login" />
      )}
      {/* RECIPE LIST */}
    </div>
  );
}

export default RecipeList;
