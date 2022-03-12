import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';

function Login() {
  // Extract the state and setter shared from the AuthContext
  const { accessToken, setAccessToken } = useContext(AuthContext);

  // Define initial state and state setter
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Since we will be using axios to send asynchronous events
  //  to the backend, add the async keyword to handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', loginData, {
        withCredentials: true,
      });

      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
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
      {/* TEST FIELD */}
      <section>
        <hr />
        <div>
          <h4>
            Email: <span>{loginData.email}</span>
          </h4>
          <h4>
            Password: <span>{loginData.password}</span>
          </h4>
        </div>
      </section>
    </div>
  );
}

export default Login;
