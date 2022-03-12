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
        const response = await axios.get('/api/ingredients', {
          withCredentials: true,
        });

        // Update the ingredientList
        setIngredientList(response.data);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };

    const getUserIngredientList = async () => {
      try {
        const response = await axios.get('/api/users/ingredients', {
          withCredentials: true,
        });
        // Update the ingredientList
        setUserIngredientList(response.data);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };

    getAllIngredients();
    getUserIngredientList();
  }, []);

  // Call the API to add an array of ingredients to the user's list of ingredients
  // useEffect((ingredientIds) => {
  //   const addIngredients = async (ingredientIds) => {
  //     try {
  //       const response = await axios.post('/api/users/ingredients', ingredientIds, {
  //         withCredentials: true,
  //       });

  //       // Update the ingredientList
  //       setIngredientList(response.data);
  //     } catch (error) {
  //       console.log(`Error: ${error.message}`);
  //     }
  //   };
  // }, [userIngredientList])

  const handleAddIngredient = (ingredientId) => {
    setUserIngredientList((prevState) => [...prevState, ingredientId]);
  };

  const handleRemoveIngredient = (ingredientId) => {
    // Create a filtered array without the ingredientId

    setUserIngredientList();
  };

  const mapList = (list) => {
    return list.map((ingredient) => (
      <li key={ingredient._id}>
        <h4>{ingredient.ingredientName}</h4>
        <p>{ingredient.foodGroup}</p>
        <p>{ingredient._id}</p>
        <button>Add to User's List</button>
      </li>
    ));
  };

  return (
    <div>
      {/* INGREDIENTS LIST */}
      <section>
        <h2>INGREDIENTS LIST</h2>
        <ul>{mapList(ingredientList)}</ul>
      </section>
      {/* USER'S INGREDIENTS LIST */}
      <section>
        <h2>USER'S INGREDIENTS LIST</h2>
        <ul>{mapList(userIngredientList)}</ul>
      </section>
      {/* SAVE USER'S CURRENT INGREDIENTS LIST TO DB */}
      <button>SAVE</button>
    </div>
  );
}

export default SelectIngredients;
