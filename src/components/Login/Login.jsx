import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from "../../../src/olx-logo.png";
import { FirebaseContext } from "../../store/Context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate("/"); 
    } catch (error) {
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
  };

  return (
    <div className="loginParentDiv">
      <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="signupLink">
        <a href="/signup">Don't have an account? Signup</a>
      </div>
    </div>
  );
};

export default Login;
