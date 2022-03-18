import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
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
              Recipe List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/logout" className="nav-link">
              Logout
            </NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;
