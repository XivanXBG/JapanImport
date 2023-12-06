import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  login,
  register,
  logout,
  githubSignIn,
  yahooSignIn,
} from "../services/authService";
import { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { googleSignIn } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const loginHandler = async (values) => {
    try {
      await login(values.usernameOrEmail, values.password);
    } catch (error) {
      throw error;
    }
    navigate("/");
  };
  const googleHandler = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      throw error;
    }
    navigate("/");
  };
  const yahooHandler = async () => {
    try {
      await yahooSignIn();
    } catch (error) {
      throw error;
    }

    navigate("/");
  };
  const githubHandler = async() => {
    try {
      await githubSignIn();
    } catch (error) {
      throw error;
    }
    navigate("/");
  };
  const registerHandler = async(values) => {
    try {
      await register(values.email, values.password, values.username);
     
    } catch (error) {
      throw error
    }
    navigate("/verify-email");
  };

  const logoutHandler = async() => {
    try {
      await logout();
     
    } catch (error) {
     throw error
    }
    navigate("/");
  };

  const contextValues = {
    loginHandler,
    isAuthenticated,
    ownerId: auth.currentUser?.uid,
    registerHandler,
    logoutHandler,
    user,
    googleHandler,
    githubHandler,
    yahooHandler,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContext.displayName = "AuthContext";

export default AuthContext;
