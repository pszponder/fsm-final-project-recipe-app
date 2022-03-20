import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/recipeDetail.css';

function RecipeDetail() {
  // Extract the state which was passed into the location object by useNavigate
  const { state } = useLocation();
  console.log(state);

  return (
    <>
      <article className="recipe-detail">
        <h1 className="recipe-detail-title">{state.recipeName}</h1>
        <p className="pb-4 border-bottom">{state.recipeDescription}</p>
        <h3>Recipe Ingredients</h3>
        <p>Here is a list of ingredients required to complete the recipe:</p>
        <table className="table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Qty</th>
              <th>Unit of Measurement</th>
            </tr>
          </thead>
          <tbody>
            {state.recipeIngredients.map((ingredient, idx) => (
              <tr key={`ingredient${idx}`}>
                <td>{ingredient.ingredientName}</td>
                <td>{ingredient.ingredientQty}</td>
                <td>{ingredient.ingredientUnitOfMeasurement}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Recipe Directions</h3>
        <p>Follow these directions in order to create the recipe:</p>
        <ol>
          {state.recipeDirections.map((direction, idx) => (
            <li key={`direction${idx}`}>{direction}</li>
          ))}
        </ol>
        <Link to="/recipe-list" className="btn btn-primary">
          Back to Recipe List
        </Link>
      </article>
    </>
  );
}

export default RecipeDetail;
