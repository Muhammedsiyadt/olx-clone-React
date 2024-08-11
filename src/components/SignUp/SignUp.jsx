import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Logo from "../../../src/olx-logo.png";
import { FirebaseContext } from "../../store/context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, { displayName: username })
          .then(() => {
            console.log("Profile updated successfully!");
            navigate("/login"); // Navigate to login page after successful signup
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="signupParentDiv">
      <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">Username</label>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="input"
          type="text"
          id="fname"
          name="name"
          placeholder="Enter your username"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="input"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
        <label htmlFor="phone">Phone</label>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="input"
          type="number"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
