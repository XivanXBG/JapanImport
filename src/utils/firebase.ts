import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUNhoi4OMYsxKDH9gjC7xa2oSv7_zBcpI",
  authDomain: "j-import.firebaseapp.com",
  databaseURL:
    "https://j-import-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "j-import",
  storageBucket: "j-import.appspot.com",
  messagingSenderId: "237641535107",
  appId: "1:237641535107:web:9978e176e2b70fb43e55b6",
  measurementId: "G-FPS8R06VC7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const rDB = getDatabase(app)

setPersistence(auth, browserLocalPersistence)
  .then(() => {
   
  })
  .catch((error) => {
    console.error("Error enabling session persistence:", error);
  });

export {rDB, db, storage, auth };

