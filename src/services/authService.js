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
    
  } catch (err) {
    throw err;
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

    await updateProfile(user, { displayName: username });

    

    await sendEmailVerification(user);
   

  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
    
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
          
            resolve({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            });
          } else {
            
            resolve(null);
          }

        
          unsubscribe();
        },
        (error) => {
       
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

      const storagePath = `profilePictures/${user.uid}`;
      const photoURL = await uploadProfilePicture(file, storagePath);

      await updateProfile(user, { photoURL });

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const updatedUser = userDocSnap.data();

     
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

  } catch (error) {
    console.error("Yahoo login error:", error.message);
    throw new Error("Yahoo login error. Please try again.");
  }
};
