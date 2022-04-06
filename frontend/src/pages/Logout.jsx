import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import DataContext from '../context/DataProvider';
import '../styles/logout.css';

function Logout() {
  // Extract the state and setter shared from the AuthContext
  const { setAccessToken, loggedIn, setLoggedIn } = useContext(AuthContext);

  // Extract the state and setter shared from the DataContext
  const { setIngredientList, setRecipeList, setUserIngredientList } =
    useContext(DataContext);

  const [logoutError, setLogoutError] = useState(false);

  useEffect(() => {
    // Call the API Logout Endpoint
    const logoutUser = async () => {
      try {
        await axios.get('/api/auth/logout', {
          withCredentials: true,
        });

        // Update state variables
        setLogoutError(false);
        setLoggedIn(false);
        setAccessToken('');
      } catch (error) {
        console.log(`Error: ${error.message}`);
        setLogoutError(true);
      }
    };
    logoutUser();

    // DELETE THE COOKIE from the client's browser
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    // CLEAR STATE
    setIngredientList([]);
    setRecipeList([]);
    setUserIngredientList([]);
  }, []);

  return (
    <div className="form-signout">
      {loggedIn ? (
        <div className="alert alert-danger" role="alert">
          Error Logging Out
        </div>
      ) : (
        <div className="alert alert-success" role="alert">
          Successfully Logged Out
        </div>
      )}
    </div>
  );
}
export default Logout;
