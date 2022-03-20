import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import axios from '../api/axios';

function Header() {
  // Extract the state and setter shared from the AuthContext
  const { loggedIn, setLoggedIn, accessToken, setAccessToken } =
    useContext(AuthContext);

  // Call the API to extract recipe list on component load
  //  (pass in empty array as 2nd argument)
  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get('/api/auth/refresh', {
          withCredentials: true,
        });

        // Update the access token and Logged In
        setAccessToken(response.data);
        setLoggedIn(true);
      } catch (error) {
        console.log(`Need to Log In: ${error.message}`);
      }
    };

    getAuth();
  }, []);

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <span className="fs-4">What's Cooking?</span>
        </a>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/recipe-list" className="nav-link">
              <FaSearch />
              Recipe List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" className="nav-link">
              <FaUser />
              Register
            </NavLink>
          </li>
          {loggedIn ? (
            <li className="nav-item">
              <NavLink to="/logout" className="nav-link">
                <FaSignOutAlt />
                Logout
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                <FaSignInAlt />
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
}

export default Header;
