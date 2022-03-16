import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../api/axios';

function Register() {
  // Define initial state and state setter
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [registerError, setRegisterError] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Change registerSuccess back to false on component unmount
  useEffect(() => {
    return () => {
      setRegisterSuccess(false);
    };
  }, []);

  // Since we will be using axios to send asynchronous events
  //  to the backend, add the async keyword to handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/auth/register', registerData);
      setRegisterError(false);
      setRegisterSuccess(true);
    } catch (error) {
      console.log(error);
      setRegisterError(true);
    }
  };

  const handleInputChange = (event) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      {registerSuccess ? (
        <Navigate to="/login" />
      ) : (
        <div>
          {/* HEADER SECTION */}
          <section>
            <h1>REGISTER</h1>
            <p>Please Create an Account</p>
          </section>
          {/* FORM SECTION*/}
          <section>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={registerData.firstName}
                  placeholder="First Name"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={registerData.lastName}
                  placeholder="Last Name"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={registerData.email}
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={registerData.password}
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <button type="submit">SUBMIT</button>
              </div>
            </form>
          </section>
        </div>
      )}
      <section>
        {registerError ? (
          <h2>Please enter the correct register information</h2>
        ) : null}
      </section>
    </>
  );
}

export default Register;
