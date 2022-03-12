import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

function Register() {
  // Define initial state and state setter
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // Since we will be using axios to send asynchronous events
  //  to the backend, add the async keyword to handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', registerData);
      // TODO: DO SOMETHING WITH RESPONSE
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
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
      {/* TEST FIELD */}
      <section>
        <hr />
        <div>
          <h4>
            First Name: <span>{registerData.firstName}</span>
          </h4>
          <h4>
            Last Name: <span>{registerData.lastName}</span>
          </h4>
          <h4>
            Email: <span>{registerData.email}</span>
          </h4>
          <h4>
            Password: <span>{registerData.password}</span>
          </h4>
        </div>
      </section>
    </div>
  );
}

export default Register;
