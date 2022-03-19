import React, { useState, useContext } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import '../styles/login.css';

function Login() {
  // Extract the state and setter shared from the AuthContext
  const { setAccessToken, loggedIn, setLoggedIn } = useContext(AuthContext);

  // Define initial state and state setter
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(false);

  // Since we will be using axios to send asynchronous events
  //  to the backend, add the async keyword to handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a post request to the API
      const response = await axios.post('/api/auth/login', {
        email: loginData.email,
        password: loginData.password,
      });

      console.log(response);

      // Store the accessToken in app state
      setAccessToken(response.data.accessToken);

      // Update loggedIn and loginError state variables
      setLoginError(false);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
      setLoginError(true);
    }
  };

  const handleInputChange = (event) => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <main className="form-signin">
      {loggedIn ? (
        <Navigate to="/" />
      ) : (
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>

          <p className="mt-4">
            New to What's Cooking? Register
            <NavLink to="/register" className="link badge badge-primary">
              here
            </NavLink>
          </p>
        </form>
      )}
      <section>
        {loginError ? (
          <div class="alert alert-danger form-signin" role="alert">
            Please enter the correct login information
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default Login;
