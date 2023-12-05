import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, logout, githubSignIn, yahooSignIn } from "../services/authService";
import { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { googleSignIn } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user,setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
     
      if (user) {
        setIsAuthenticated(true);
        setUser(user)
      } else {
        setIsAuthenticated(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const loginHandler = (values, setError) => {
    try {
      login(values.usernameOrEmail, values.password);
      // If login is successful, reset the error (if there was any)
      
      navigate("/");
    } catch (error) {
      console.log('asdhello');
      throw new Error(error)
    }
  };
  const googleHandler = async () => {
    
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      
    }
    
    
    
  };
  const yahooHandler = async () => {
    
    try {
      await yahooSignIn();
      navigate("/");
    } catch (error) {
      
    }
    
    
    
  };
  const githubHandler = () => {
    
    try {
      githubSignIn();
      
      navigate('/')
    } catch (error) {
      
    }
    
    
    
  };
  const registerHandler = (values) => {
    
    try {
      register(values.email, values.password, values.username);
      navigate("/verify-email");
    } catch (error) {
      console.error(error);
    }
    
    
  };

  const logoutHandler = () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
   
    
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
    yahooHandler
  };

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

AuthContext.displayName = "AuthContext";

export default AuthContext;
