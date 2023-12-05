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
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Signed in", user);
    })
    .catch((err) => console.error("Error signing in:", err.message));
};

export const register = (email, password, username) => {
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

export const getCurrentUserInfo = async () => {
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
};
const uploadProfilePicture = async (file, storagePath) => {
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
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
    console.error("Error updating user profile picture:", error);
    throw error; // Propagate the error to the caller if needed
  }
};

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google login successful:", user);
  } catch (error) {
    console.error("Google login error:", error);
  }
};
export const githubSignIn = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("GitHub login successful:", user);
  } catch (error) {
    console.error("GitHub login error:", error);
  }
};
export const yahooSignIn = async () => {
  const provider = new OAuthProvider('yahoo.com');
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Yahoo login successful:", user);
  } catch (error) {
    console.error("Yahoo login error:", error);
  }
};
