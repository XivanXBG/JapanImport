import { db, rDB, auth, storage } from "../utils/firebase.ts";
import { collection, getDocs } from "firebase/firestore";
import { ref, push, get, set } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export const loadCars = async () => {
  const carsCollection = await collection(db, "cars");
  const snapshot = await getDocs(carsCollection);

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
};

export const createOffer = async (offerData) => {
  const { photos, ...otherOfferData } = offerData;

  // Get a reference to the "offers" node in the Realtime Database
  const offersRef = ref(rDB, "offers");
  console.log(offerData);
  // Generate a unique key for the new offer
  const newOfferKey = push(offersRef).key;

  const storagePhotosRef = storageRef(storage, `offers/${newOfferKey}/photos`);

  await Promise.all(
    photos.map(async (photo, index) => {
      const photoRef = storageRef(storagePhotosRef, `${index + 1}.jpg`);

      await uploadBytes(photoRef, photo);
    })
  );

  // Generate image paths for the Realtime Database
  const photoPaths = photos.map(
    (_, index) => `offers/${newOfferKey}/photos/${index + 1}.jpg`
  );

  // Add additional offer details
  const ownerId = auth.currentUser?.uid;
  const offerWithPhotos = {
    ...otherOfferData,
    photos: photoPaths,
    ownerId,
  };

  // Set the entire offer data (including photos) to the "offers" node
  await set(ref(rDB, `offers/${newOfferKey}`), offerWithPhotos);

  console.log("Offer added with key:", newOfferKey);
  return newOfferKey;
};

export const loadAllOffersWithPhotos = async () => {
  try {
    const offersRef = ref(rDB, "offers");
    const offersSnapshot = await get(offersRef);

    if (offersSnapshot.exists()) {
      const offersData = offersSnapshot.val();
      const allOffersWithPhotos = await Promise.all(
        Object.entries(offersData).map(async ([offerId, offerData]) => {
          // Load photos from storage based on photo paths
          const offerPhotos = offerData.photos;
          const photos = await loadPhotosFromStorage(offerPhotos[0]);

          // Combine offer data with loaded photos
          return { ...offerData, photos, id: offerId };
        })
      );
      console.log(allOffersWithPhotos);
      return allOffersWithPhotos;
    } else {
      console.error("No offers found");
      return [];
    }
  } catch (error) {
    console.error("Error loading offers:", error.message);
    return [];
  }
};

const loadPhotosFromStorage = async (photoPaths) => {
  try {
    const photoRef = storageRef(storage, photoPaths);
    const photoURL = await getDownloadURL(photoRef);
    console.log(photoURL);
    return photoURL;

  
  } catch (error) {
    console.error("Error loading photos from storage:", error.message);
    return [];
  }
};
