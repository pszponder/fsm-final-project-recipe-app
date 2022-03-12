import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';

function Logout() {
  // Extract the state and setter shared from the AuthContext
  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    // TODO: Call the API Logout Endpoint
    const logoutUser = async () => {
      try {
        const response = await axios.get('/api/auth/logout', {
          withCredentials: true,
        });
        console.log(response);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };
    logoutUser();

    // TODO: DELETE THE COOKIE from the client's browser
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }, []);

  return (
    <div>
      <h1>Successfully Logged Out</h1>
    </div>
  );
}

export default Logout;