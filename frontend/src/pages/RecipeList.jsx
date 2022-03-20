import React, { useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import DataContext from '../context/DataProvider';
import '../styles/recipeList.css';

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
        if (recipeIngredientName === userIngredientName.ingredientName) {
          return true;
        }
      }
    }

    return false;
  };

  // If the user hasn't selected any ingredients, return an error message
  if (userIngredientList.length === 0 && loggedIn) {
    return (
      <div className="alert alert-danger" role="alert">
        Please select ingredients to receive recipe recommendations.
      </div>
    );
  }

  return (
    <div>
      {loggedIn && userIngredientList.length > 0 ? (
        <section>
          <h1>Recipes List</h1>
          <div className="card-group">
            {recipeList.map((recipe) => {
              return matchRecipe(recipe) ? (
                <div className="card" key={recipe._id}>
                  <img
                    className="card-img-top"
                    src="https://picsum.photos/200/100"
                    alt="Recipe"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.recipeName}</h5>
                    <p className="card-text">{recipe.recipeDescription}</p>
                  </div>
                  <button
                    className="btn btn-primary mb-3"
                    onClick={() => handleClick(recipe)}
                  >
                    View Recipe
                  </button>
                </div>
              ) : null;
            })}
          </div>
        </section>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}

export default RecipeList;
