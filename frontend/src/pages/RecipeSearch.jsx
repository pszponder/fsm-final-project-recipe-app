import React, { useEffect, useState } from 'react'
import Recipe from './Recipe';

  
const RecipeSearch = () => {


  const APP_ID = '0f033f42';
  const APP_KEY = '04389991f9bfed3dbd1da607ca07133b';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(() => {
    getRecipes();
  }, [query])
  const getRecipes = async () => {
    const response = await fetch
          (`https://api.edamam.com/search?q=${query}&app_id=${'0f033f42'}&app_key=${'04389991f9bfed3dbd1da607ca07133b'}`);
    const data = await response.json();
    setRecipes(data.hits);
    // console.log(data);
  
  };
  const updateSearch = e => {
    setSearch(e.target.value);
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  
  return (
    <article className="search-form">
      <form className="search-form-submit" onSubmit={getSearch}  >
      <h3>Search Ingredients</h3>
        <p>Enter one or more ingredients to complete search. (Example: Basil, Chicken):</p>
        <input className="search-bar" type="text" value={search}
             onChange={updateSearch} />
        <button className="search-button" type="submit" >
             Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
  
        ))}
      </div>
    </article>
  );
}
  
export default RecipeSearch;