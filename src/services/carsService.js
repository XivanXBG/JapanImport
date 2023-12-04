import { db, auth, storage } from "../utils/firebase.ts";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export const loadCars = async () => {
  const carsCollection = collection(db, "cars");
  const snapshot = await getDocs(carsCollection);

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
};

export const createOffer = async (offerData) => {
  const { photos, price, year, killometers, ...otherOfferData } = offerData;

  // Convert to numbers
  offerData.price = Number(price);
  offerData.year = Number(year);
  offerData.killometers = Number(killometers);

  const offersCollection = collection(db, "offers");
  const newOfferDoc = await addDoc(offersCollection, {
    ...otherOfferData,
    ownerId: auth.currentUser?.uid,
    price: Number(offerData.price),
    year: Number(offerData.year),
    killometers: Number(offerData.killometers),
    photos: [], // Initialize photos as an empty array
  });

  const newOfferId = newOfferDoc.id;
  const storagePhotosRef = storageRef(storage, `offers/${newOfferId}/photos`);

  const uploadedPhotos = await Promise.all(
    photos?.map(async (photo, index) => {
      const photoRef = storageRef(storagePhotosRef, `${index + 1}.jpg`);
      await uploadBytes(photoRef, photo);
      const photoURL = await getDownloadURL(photoRef);
      return photoURL;
    })
  );

  // Update the offer document with the photo URLs
  const offerDocRef = doc(db, "offers", newOfferId);
  await updateDoc(offerDocRef, { photos: uploadedPhotos });

  console.log("Offer added with id:", newOfferId);
  return newOfferId;
};


export const loadAllOffersWithPhotos = async () => {
  try {
    const offersCollection = collection(db, "offers");
    const offersSnapshot = await getDocs(offersCollection);

    const allOffersWithPhotos = offersSnapshot.docs.map((doc) => {
      const offerData = doc.data();
      const offerId = doc.id;

      return { ...offerData, id: offerId };
    });

    return allOffersWithPhotos;
  } catch (error) {
    console.error("Error loading offers:", error.message);
    return [];
  }
};

export const loadOfferWithPhoto = async (id) => {
  try {
    const offerDocRef = doc(db, "offers", id);
    const offerSnapshot = await getDoc(offerDocRef);

    if (offerSnapshot.exists()) {
      const offerData = offerSnapshot.data();

      return { ...offerData, id };
    }
  } catch (error) {
    console.error("Error loading offer:", error.message);
    return null;
  }
};
