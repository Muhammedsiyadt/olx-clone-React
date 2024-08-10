import React from 'react';
import './SignUp.css';
import Logo from '../../../src/olx-logo.png';

const SignUp = () => {
  return (
    <div className="signupParentDiv">
      <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
      <form>
        <label htmlFor="fname">Username</label>
        <input
          className="input"
          type="text"
          id="fname"
          name="name"
          placeholder="Enter your username"
        />
        <label htmlFor="email">Email</label>
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
        <label htmlFor="phone">Phone</label>
        <input
          className="input"
          type="number"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
        />
        <label htmlFor="password">Password</label>
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
        />
        <button type="submit">Signup</button>
      </form>
      <a href="/login">Login</a>
    </div>
  );
};

export default SignUp;
