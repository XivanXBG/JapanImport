import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Signed in", user);
    })
    .catch((err) => console.error("Error signing in:", err.message));
};

export const register = (email, password,username) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Set display name
      updateProfile(user, {
        displayName: username,
      })
        .then(() => {
          console.log("User registered with display name:", user.displayName);
        })
        .catch((error) => {
          console.error("Error setting display name:", error.message);
        });
      console.log("Registred in", user);
    })
    .catch((err) => console.error("Error signing in:", err.message));
};

export const logout = () => {
  auth
    .signOut()
    .then(() => {
      console.log("User signed out");
      // You can also redirect or perform other actions after sign-out
    })
    .catch((error) => {
      console.error("Error signing out:", error.message);
    });
};
