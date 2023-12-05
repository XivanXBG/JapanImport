import { db, auth, storage } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  OAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";


export const login = async (email, password) => {
  
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Signed in", user);
  } catch (err) {
    console.error("Error signing in:", err.code, err.message);

    let errorMessage = "Login failed. Please check your credentials.";

    throw new Error(errorMessage);
  }
};

export const register = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Set display name
    await updateProfile(user, { displayName: username });

    console.log("User registered with display name:", user.displayName);

    // Send email verification
    await sendEmailVerification(user);
    console.log("Verification email sent successfully.");

    console.log("Registered in", user);
  } catch (err) {
    console.error("Error registering:", err.code, err.message);

    let errorMessage = "Registration failed. Please try again.";

    // Customize error message based on Firebase error code
    switch (err.code) {
      case "auth/email-already-in-use":
        errorMessage = "Registration failed. Email is already in use.";
        break;
      // ... Add more cases for other Firebase error codes as needed
    }

    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw new Error("Error signing out. Please try again.");
  }
};

export const getCurrentUserInfo = async () => {
  try {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            // User is authenticated, resolve with user info
            resolve({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            });
          } else {
            // User is not authenticated, resolve with null
            resolve(null);
          }

          // Unsubscribe to avoid memory leaks
          unsubscribe();
        },
        (error) => {
          // Reject with the error if there is an issue
          reject(error);
        }
      );
    });
  } catch (error) {
    console.error("Error getting current user info:", error.message);
    throw new Error("Error getting current user info. Please try again.");
  }
};

const uploadProfilePicture = async (file, storagePath) => {
  try {
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading profile picture:", error.message);
    throw new Error("Error uploading profile picture. Please try again.");
  }
};

export const updateAuthProfilePicture = async (file) => {
  try {
    const user = auth.currentUser;

    if (user && file) {
      // Upload the file to Firebase Storage
      const storagePath = `profilePictures/${user.uid}`;
      const photoURL = await uploadProfilePicture(file, storagePath);

      // Update the user's profile with the new photoURL
      await updateProfile(user, { photoURL });

      // Fetch the updated user data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const updatedUser = userDocSnap.data();

      console.log("Updated user profile:", updatedUser);
      return photoURL;
    } else {
      console.error("No authenticated user or file found.");
    }
  } catch (error) {
    console.error("Error updating user profile picture:", error.message);
    throw new Error("Error updating user profile picture. Please try again.");
  }
};

export const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google login successful:", user);
  } catch (error) {
    console.error("Google login error:", error.message);
    throw new Error("Google login error. Please try again.");
  }
};

export const githubSignIn = async () => {
  try {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("GitHub login successful:", user);
  } catch (error) {
    console.error("GitHub login error:", error.message);
    throw new Error("GitHub login error. Please try again.");
  }
};

export const yahooSignIn = async () => {
  try {
    const provider = new OAuthProvider("yahoo.com");
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Yahoo login successful:", user);
  } catch (error) {
    console.error("Yahoo login error:", error.message);
    throw new Error("Yahoo login error. Please try again.");
  }
};
