// =========================================================
// CREATE A CONTEXT TO SHARE STATE RELATED TO AUTHENTICATION
// =========================================================

import { createContext, useState, useEffect } from 'react';

// Create a Context using createContext
const AuthContext = createContext({});

// Create a provider component for the Auth Context
//  The children parameters represent the children components
//  which will be wrapped by the Provider
export const AuthProvider = ({ children }) => {
  // Define state variables to share from within the context
  const [accessToken, setAccessToken] = useState('');

  return (
    // Pass the state to the Context.Provider
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
