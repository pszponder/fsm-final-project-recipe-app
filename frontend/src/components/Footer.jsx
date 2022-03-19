import React from 'react';

function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-muted">
          Full Stack Mastery Bootcamp Final Project
        </p>
        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <a
              href="https://github.com/pszponder/fsm-final-project-recipe-app/tree/develop"
              className="nav-link px-2 text-muted"
            >
              Project on GitHub
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
