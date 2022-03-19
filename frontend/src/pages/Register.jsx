import React, { useState, useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import axios from '../api/axios';
import '../styles/register.css';

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
    <main className="form-register">
      {registerSuccess ? (
        <Navigate to="/login" />
      ) : (
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please Create an Account</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={registerData.firstName}
              placeholder="First Name"
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInput">First Name</label>
          </div>
          <div className="form-floating">
            <input
              className="form-control"
              type="text"
              id="lastName"
              name="lastName"
              value={registerData.lastName}
              placeholder="Last Name"
              onChange={handleInputChange}
            />
            <label htmlFor="floatingInput">Last Name</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              id="email"
              name="email"
              value={registerData.email}
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
              value={registerData.password}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Register
          </button>
          <p className="mt-4">
            Already registered? Signin
            <NavLink to="/login" className="link badge badge-primary">
              here
            </NavLink>
          </p>
        </form>
      )}
      <section>
        {registerError ? (
          <div className="alert alert-danger form-register" role="alert">
            Please enter the correct registration information
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default Register;
