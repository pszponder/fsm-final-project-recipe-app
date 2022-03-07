import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
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
      </ul>
    </header>
  );
}

export default Header;
