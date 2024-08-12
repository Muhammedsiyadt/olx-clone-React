import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FirebaseContext } from "./store/Context.jsx";
import { auth } from "./firebase/config.js"; // Import the auth object

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseContext.Provider value={{ auth }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </StrictMode>
);
