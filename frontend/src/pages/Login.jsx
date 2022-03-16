import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';

function Login() {
  // Extract the state and setter shared from the AuthContext
  const { accessToken, setAccessToken } = useContext(AuthContext);

  // Define initial state and state setter
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    loggedIn: false,
    loginError: false,
  });

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
      setLoginData((prevState) => ({
        ...prevState,
        loginError: false,
        loggedIn: true,
      }));

      console.log(loginData.loggedIn);
    } catch (error) {
      console.log(error);

      setLoginData((prevState) => ({
        ...prevState,
        loginError: true,
      }));
    }
  };

  const handleInputChange = (event) => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      {loginData.loggedIn ? (
        <Navigate to="/" />
      ) : (
        <div>
          {/* HEADER SECTION */}
          <section>
            <h1>Login</h1>
            <p>Please Login</p>
          </section>
          {/* FORM SECTION */}
          <section>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={loginData.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={loginData.password}
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <button type="submit">SUBMIT</button>
              </div>
            </form>
          </section>
          <section>
            {loginData.loginError ? (
              <h2>Please enter the correct login information</h2>
            ) : null}
          </section>
          {/* TEST FIELD */}
          {/* <section>
        <hr />
        <div>
          <h4>
            Email: <span>{loginData.email}</span>
          </h4>
          <h4>
            Password: <span>{loginData.password}</span>
          </h4>
        </div>
      </section> */}
        </div>
      )}
    </>
  );
}

export default Login;
