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

        // TODO: REMOVE
        console.log('ingredientList :>> ', ingredientList);

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

        // TODO: REMOVE
        console.log('userIngredientList :>> ', userIngredientList);
        // Update the ingredientList
        setUserIngredientList(response.data);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };

    getAllIngredients();
    getUserIngredientList();
  }, []);

  // // Call the API to add an array of ingredients to the user's list of ingredients
  // useEffect(() => {
  //   const ingredientIds = userIngredientList.map(
  //     (ingredient) => ingredient._id
  //   );
  //   console.log('ingredientIds', ingredientIds);

  //   const removeAllIngredients = async () => {
  //     try {
  //       const response = await axios.delete('/api/users/ingredients', {
  //         withCredentials: true,
  //       });
  //     } catch (error) {
  //       console.log(`Error: ${error.message}`);
  //     }
  //   };

  //   const addIngredients = async () => {
  //     try {
  //       const response = await axios.post(
  //         '/api/users/ingredients',
  //         { ingredientIds },
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //     } catch (error) {
  //       console.log(`Error: ${error.message}`);
  //     }
  //   };
  //   removeAllIngredients();
  //   addIngredients();
  // }, [userIngredientList]);

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

  // TODO: DOES THIS NEED TO BE USEEFFECT?
  const handleSave = () => {
    console.log('TODO: FIX ME, NOT UPDATING DB PROPERLY');
    const ingredientIds = userIngredientList.map(
      (ingredient) => ingredient._id
    );
    console.log('ingredientIds', ingredientIds);

    const removeAllIngredients = async () => {
      try {
        const response = await axios.delete('/api/users/ingredients', {
          withCredentials: true,
        });
        console.log('RESPONSE FROM REMOVING INGREDIENTS', response);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };

    const addIngredients = async () => {
      console.log(ingredientIds);
      try {
        const response = await axios.post(
          '/api/users/ingredients',
          { ingredientIds },
          {
            withCredentials: true,
          }
        );
        console.log('RESPONSE FROM ADDING INGREDIENTS', response);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };

    removeAllIngredients();
    addIngredients();
  };

  return (
    <div>
      {/* INGREDIENTS LIST */}
      <section>
        <h2>INGREDIENTS LIST</h2>
        {/* <ul>{mapList(ingredientList)}</ul> */}
        <ul>
          {ingredientList.map((ingredient) => (
            <li key={ingredient._id}>
              <h4>{ingredient.ingredientName}</h4>
              <p>{ingredient.foodGroup}</p>
              <p>{ingredient._id}</p>
              <button onClick={() => handleAddIngredient(ingredient)}>
                Add to User's List
              </button>
            </li>
          ))}
        </ul>
      </section>
      {/* USER'S INGREDIENTS LIST */}
      <section>
        <h2>USER'S INGREDIENTS LIST</h2>
        <ul>
          {userIngredientList.map((ingredient) => (
            <li key={ingredient._id}>
              <h4>{ingredient.ingredientName}</h4>
              <p>{ingredient._id}</p>
              <button onClick={() => handleRemoveIngredient(ingredient)}>
                Remove from User's List
              </button>
            </li>
          ))}
        </ul>
      </section>
      {/* SAVE USER'S CURRENT INGREDIENTS LIST TO DB */}
      <section>
        <button onClick={handleSave}>SAVE TO DB</button>
      </section>
    </div>
  );
}

export default SelectIngredients;
