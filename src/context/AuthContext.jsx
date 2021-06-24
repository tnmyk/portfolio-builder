import React, { useContext, useState, useEffect } from "react";
import { auth, provider } from "../firebase";
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const signInWithGoogle = () => {
    return auth.signInWithPopup(provider);
  };
  const signOut = () => {
    return auth.signOut()
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    signInWithGoogle,
    signOut
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
