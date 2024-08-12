import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Logo from "../../../src/olx-logo.png";
import { FirebaseContext } from "../../store/Context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from '../../firebase/config'; // Import correctly

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { auth } = useContext(FirebaseContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      
      const userCollectionRef = collection(db, "user"); 
      await addDoc(userCollectionRef, { 
        uid: user.uid,
        username,
        authProvider: "local",
        email
      });

      console.log("Profile updated and user data saved successfully!");
      navigate("/login"); 
    } catch (error) {
      toast.error(error.code.split('/')[1].split('-').join(" "));
      console.log('Error:', error);
    }
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
