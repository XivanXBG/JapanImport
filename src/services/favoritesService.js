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
      // If the user document already exists, update the favorites array
      await setDoc(
        userDocRef,
        { favorites: arrayUnion(offer) },
        { merge: true }
      );
    } else {
      // If the user document doesn't exist, create it with the favorites array
      await setDoc(userDocRef, { userId, favorites: [offer] });
    }

    console.log("User favorites updated in Firestore:", userId, offer);
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
      // If the user document exists, remove the offer from the favorites array
      await setDoc(
        userDocRef,
        { favorites: arrayRemove(offer) },
        { merge: true }
      );

      console.log("User favorites updated in Firestore:", userId, offer);
    } else {
      console.log("User document not found:", userId);
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

      // Filter out undefined values from favorites
      const validFavorites = favorites.filter((offerId) => offerId);

      // Load the offers based on valid offerIds
      const offers = await Promise.all(
        validFavorites.map(async (offerId) => {
          const offer = await loadOfferWithPhoto(offerId);
          if (offer !== undefined) {
            console.log("Offer:", offer);
            return offer;
          } else {
            console.log(`Offer with ID ${offerId} not found or deleted.`);
            
          }
        })
      );

      // Filter out any remaining undefined values
      const filteredOffers = offers.filter((offer) => offer !== undefined);

      return filteredOffers;
    } else {
      console.log("User document not found:", userId);
      return [];
    }
  } catch (error) {
    console.error("Error loading user favorites from Firestore:", error);
    throw error;
  }
};

