import { db, auth, storage } from "../utils/firebase.ts";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  query, where,
  deleteDoc 
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
export const updateOffer = async (offerId, updatedOfferData) => {
  const offerDocRef = doc(db, "offers", offerId);

  try {
    const { photos: newPhotos, price, year, killometers, ...otherOfferData } = updatedOfferData;

    // Convert to numbers
    updatedOfferData.price = Number(price);
    updatedOfferData.year = Number(year);
    updatedOfferData.killometers = Number(killometers);

    // Update other fields of the offer
    await updateDoc(offerDocRef, {
      ...otherOfferData,
      price: Number(updatedOfferData.price),
      year: Number(updatedOfferData.year),
      killometers: Number(updatedOfferData.killometers),
    });

    // If there are new photos, append them to the existing ones
    if (newPhotos && newPhotos.length > 0) {
      const storagePhotosRef = storageRef(storage, `offers/${offerId}/photos`);

      // Fetch the existing photos
      const existingPhotos = (await getDoc(offerDocRef)).data().photos || [];

      // Combine existing photos with new photos
      const allPhotos = [...existingPhotos, ...newPhotos];

      // Upload all photos
      const uploadedPhotos = await Promise.all(
        allPhotos.map(async (photo, index) => {
          if (typeof photo === 'string') {
            // This is an existing photo URL, no need to re-upload
            return photo;
          }

          // This is a new photo, upload it
          const photoRef = storageRef(storagePhotosRef, `${index + 1}.jpg`);
          await uploadBytes(photoRef, photo);
          const photoURL = await getDownloadURL(photoRef);
          return photoURL;
        })
      );

      // Update the offer document with the new photo URLs
      await updateDoc(offerDocRef, { photos: uploadedPhotos });
    }

    console.log("Offer updated successfully!");
  } catch (error) {
    console.error("Error updating offer:", error.message);
    throw error;
  }
};


export const deleteOfferById = async (id) => {
  try {
    const offerDocRef = doc(db, "offers", id);
    await deleteDoc(offerDocRef);

    console.log(`Offer with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting offer:", error.message);
    throw error;
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
export const loadOffersByOwnerId = async (ownerId) => {
  try {
    
    const offersQuery = query(collection(db, "offers"), where("ownerId", "==", ownerId));
    
    // Execute the query and get the documents
    const querySnapshot = await getDocs(offersQuery);

    // Extract the data from the querySnapshot
    const offers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
console.log(offers);
    return offers;
  } catch (error) {
    console.error("Error loading offers by ownerId:", error.message);
    return null;
  }
};
