import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';


function Header() {
  // Extract the state and setter shared from the AuthContext
  const { loggedIn } = useContext(AuthContext);
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
              <FaSearch style={{ display: 'inline-block' }}
 />
              Recipe List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" className="nav-link">
              <FaUser style={{ display: 'inline-block' }}
 />Register
            </NavLink>
          </li>
          {loggedIn ? (
            <li className="nav-item">
              <NavLink to="/logout" className="nav-link">
                <FaSignOutAlt  style={{ display: 'inline-block' }}
/>
                Logout
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                <FaSignInAlt style={{ display: 'inline-block' }}
 />
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
