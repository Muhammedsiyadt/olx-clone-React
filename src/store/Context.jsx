import { createContext, useState } from "react";

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null); // Initialize Firebase Auth here

  return (
    <FirebaseContext.Provider value={{ auth, user, setUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};

