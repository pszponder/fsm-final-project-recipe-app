import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function RecipeDetail() {
  // Extract the state which was passed into the location object by useNavigate
  const { state } = useLocation();
  console.log(state);

  return (
    <div>
      <Link to="/recipe-list">Back</Link>
      <h1>{state.recipeName}</h1>
      <h2>{state.recipeDescription}</h2>
      <ul>
        {state.recipeIngredients.map((ingredient, idx) => (
          <li key={`ingredient${idx}`}>
            {`${ingredient.ingredientName}: ${ingredient.ingredientQty} ${ingredient.ingredientUnitOfMeasurement}`}
          </li>
        ))}
      </ul>
      <ol>
        {state.recipeDirections.map((direction, idx) => (
          <li key={`direction${idx}`}>{direction}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetail;
