import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, logout } from "../services/authService";
import { useState, useEffect } from "react";
import { auth } from "../utils/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Update isAuthenticated based on the user's authentication status
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const loginHandler =  (values) => {
    
    try {
      login(values.usernameOrEmail, values.password);
    } catch (error) {
      
    }
    
    navigate("/");
    
  };

  const registerHandler = (values) => {
    
    try {
      register(values.email, values.password, values.username);
    } catch (error) {
      console.error(error);
    }
    navigate("/");
    
  };

  const logoutHandler = () => {
    try {
      logout();
    } catch (error) {
      console.error(error);
    }
    navigate("/");
    
  };

  const contextValues = {
    loginHandler,
    isAuthenticated,
    registerHandler,
    logoutHandler,
  };

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

AuthContext.displayName = "AuthContext";

export default AuthContext;
