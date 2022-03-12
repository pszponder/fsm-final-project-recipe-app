import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <div>
          <Link to="/">What's Cooking?</Link>
        </div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </header>
      <hr />
    </>
  );
}

export default Header;
