// =========================================================
// CREATE A CONTEXT TO SHARE STATE RELATED TO AUTHENTICATION
// =========================================================

import { createContext, useState } from 'react';

// Create a Context using createContext
const DataContext = createContext({});

// Create a provider component for the Data Context
//  The children parameters represent the children components
//  which will be wrapped by the Provider
export const DataProvider = ({ children }) => {
  // Define state variables to share from within the context
  const [ingredientList, setIngredientList] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [userIngredientList, setUserIngredientList] = useState([]);

  return (
    // Pass the state to the Context.Provider
    <DataContext.Provider
      value={{
        ingredientList,
        setIngredientList,
        recipeList,
        setRecipeList,
        userIngredientList,
        setUserIngredientList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
