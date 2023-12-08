import { db } from "../utils/firebase.ts";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { loadOfferWithPhoto } from "./offersService.js";

export const updateUserFavoritesInFirestore = async (userId, offer) => {
  try {
    const usersCollection = collection(db, "users");
    const userDocRef = doc(usersCollection, userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      await setDoc(
        userDocRef,
        { favorites: arrayUnion(offer) },
        { merge: true }
      );
    } else {
      await setDoc(userDocRef, { userId, favorites: [offer] });
    }

   
  } catch (error) {
    console.error("Error updating user favorites in Firestore:", error);
    throw error;
  }
};
export const removeFavoriteFromFirestore = async (userId, offer) => {
  try {
    const usersCollection = collection(db, "users");
    const userDocRef = doc(usersCollection, userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      await setDoc(
        userDocRef,
        { favorites: arrayRemove(offer) },
        { merge: true }
      );

      
    } else {
      
    }
  } catch (error) {
    console.error("Error updating user favorites in Firestore:", error);
    throw error;
  }
};

export const loadUserFavoritesFromFirestore = async (userId) => {
  try {
    const usersCollection = collection(db, "users");
    const userDocRef = doc(usersCollection, userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const favorites = userData.favorites || [];

      const validFavorites = favorites.filter((offerId) => offerId);

      const offers = await Promise.all(
        validFavorites.map(async (offerId) => {
          const offer = await loadOfferWithPhoto(offerId);
          if (offer !== undefined) {
            
            return offer;
          } else {
            
            
          }
        })
      );

      const filteredOffers = offers.filter((offer) => offer !== undefined);

      return filteredOffers;
    } else {
    
      return [];
    }
  } catch (error) {
    console.error("Error loading user favorites from Firestore:", error);
    throw error;
  }
};

