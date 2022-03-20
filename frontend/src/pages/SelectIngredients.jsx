import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import DataContext from '../context/DataProvider';

function SelectIngredients() {
  // Extract the state and setter shared from the DataContext
  const {
    ingredientList,
    setIngredientList,
    userIngredientList,
    setUserIngredientList,
  } = useContext(DataContext);

  // Call the API to extract ingredients and user ingredients list
  //  on component load (pass in empty array as 2nd argument)
  useEffect(() => {
    const getAllIngredients = async () => {
      try {
        const response = await axios.get('/api/ingredients');

        // Update the ingredientList
        setIngredientList(response.data);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };

    const getUserIngredientList = async () => {
      try {
        const response = await axios.get('/api/users/ingredients');

        // Update the ingredientList
        setUserIngredientList(response.data);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };

    getAllIngredients();
    getUserIngredientList();
  }, []);

  const handleAddIngredient = (ingredient) => {
    // Check that ingredient isn't already in user's list
    const idx = userIngredientList.findIndex(
      (userIngredient) =>
        userIngredient.ingredientName === ingredient.ingredientName
    );

    // Add ingredient to user's list if it does not exist
    if (idx === -1) {
      setUserIngredientList((prevState) => [...prevState, ingredient]);
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    // Create a filtered array without the ingredientId
    const filteredIngredients = userIngredientList.filter(
      (userIngredient) => userIngredient._id !== ingredient._id
    );

    // Update the User's ingredient List with the filtered list
    setUserIngredientList(filteredIngredients);
  };

  const handleSave = () => {
    const ingredientIds = userIngredientList.map(
      (ingredient) => ingredient._id
    );

    const updateAllIngredients = async () => {
      try {
        const response = await axios.put('/api/users/ingredients', {
          ingredientIds,
        });
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };

    updateAllIngredients();
  };

  return (

    <div>
      {/* INGREDIENTS LIST */}
      <section className="ingredients-list">
        <h2 className='ingredients-list-title'>{}</h2>
        <p className='pb-4 border-bottom'>{}</p>
        <h3>INGREDIENTS LIST</h3>
        {/* <ul>{mapList(ingredientList)}</ul> */}
        <table className='table'>
          <thead>
              <tr>
                <th>Name</th>
                <th>Food Group</th>
                <th>Ingredient Id</th>
              </tr>
            </thead>
            <tbody>
              {ingredientList.map((ingredient) => (
                <tr key={ingredient._id}>
                  <td>{ingredient.ingredientName}</td>
                  <td>{ingredient.foodGroup}</td>
                  <td>{ingredient._id}</td>
                  <button onClick={() => handleAddIngredient(ingredient)}>
                    Add to User's List
                  </button>
                </tr>
              ))}
            </tbody>
        </table>
      </section>
      {/* USER'S INGREDIENTS LIST */}
      <section className='ingredients-userlist'>
      <h2 className='ingredients-userlist-title'>{}</h2>
        <p className='pb-4 border-bottom'>{}</p>
        <h2>USER'S INGREDIENTS LIST</h2>
        <table className='table'>
          <thead>
              <tr>
                <th>Name</th>
                <th>Ingredient Id</th>
              </tr>
            </thead>
            <tbody>
          {userIngredientList.map((ingredient) => (
            <tr key={ingredient._id}>
              <td>{ingredient.ingredientName}</td>
              <td>{ingredient._id}</td>
              <button onClick={() => handleRemoveIngredient(ingredient)}>
                Remove from User's List
              </button>
            </tr>
          ))}
          </tbody>
        </table>
      </section>
      {/* SAVE USER'S CURRENT INGREDIENTS LIST TO DB */}
      <section>
        <button onClick={handleSave}>SAVE TO DB</button>
      </section>
    </div>
  );
}

export default SelectIngredients;
