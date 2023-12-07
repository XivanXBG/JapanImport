import { db, auth, storage } from "../utils/firebase.ts";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  deleteDoc,
  setDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
export const deleteOrderById = async (orderId) => {
  try {
    const orderDocRef = doc(db, "orders", orderId);
    await deleteDoc(orderDocRef);

    console.log("Order deleted successfully");
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};
export const getOrderByIdWithOffers = async (orderId) => {
  try {
    // Assuming you have a Firestore collection called "orders"
    const orderDocRef = doc(db, "orders", orderId);
    const orderDocSnapshot = await getDoc(orderDocRef);

    if (orderDocSnapshot.exists()) {
      const orderData = orderDocSnapshot.data();

      // Assuming your order data has an "itemIds" field which is an array of offer IDs
      const itemIds = orderData.car_ids;

      // Load offer data for each item ID
      const offersData = await Promise.all(itemIds.map((itemId) => loadOfferWithPhoto(itemId)));

      // Combine order and offer data
      const combinedData = {
        orderId: orderId,
        order: orderData,
        offers: offersData,
      };

      return combinedData;
    } else {
      console.error("Order not found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving order:", error);
    return null;
  }
};

export const addNewOrder = async (orderData) => {
  try {
    const ordersCollection = collection(db, 'orders');
    const docRef = await addDoc(ordersCollection, orderData);

    // Log the ID of the newly created document
    console.log('Document ID:', docRef.id);

    // Return the ID if needed
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error; // Optionally rethrow the error
  }
};
export const loadCars = async () => {
  const carsCollection = collection(db, "cars");
  const snapshot = await getDocs(carsCollection);

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
};
export const loadCriteria = async () => {
  const criteriasCollection = collection(db, "criterias");
  const snapshot = await getDocs(criteriasCollection);

  const data = {};
  snapshot.docs.forEach((doc) => {
    data[doc.id] = doc.data().models;
  });

  return data;
};

export const getOrdersByOwnerId = async (ownerId) => {
  try {
    // Reference to the "orders" collection
    const ordersCollection = collection(db, 'orders');

    // Create a query to get orders based on ownerId
    const ordersQuery = query(ordersCollection, where('ownerId', '==', ownerId));

    // Get the documents based on the query
    const querySnapshot = await getDocs(ordersQuery);

    // Extract the data from the documents
    const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return orders;
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error; // Optionally rethrow the error
  }
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
    const {
      photos: newPhotos,
      price,
      year,
      killometers,
      ...otherOfferData
    } = updatedOfferData;

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
          if (typeof photo === "string") {
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
    const offersQuery = query(
      collection(db, "offers"),
      where("ownerId", "==", ownerId)
    );

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


export const updateUserFavoritesInFirestore = async (userId, offer) => {
  try {
    
    const usersCollection = collection(db,'users')
    const userDocRef = doc(usersCollection, userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // If the user document already exists, update the favorites array
      await setDoc(userDocRef, { favorites: arrayUnion(offer) }, { merge: true });
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
    const usersCollection = collection(db,'users')
    const userDocRef = doc(usersCollection, userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // If the user document exists, remove the offer from the favorites array
      await setDoc(userDocRef, { favorites: arrayRemove(offer) }, { merge: true });

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
    const usersCollection = collection(db,'users')
    const userDocRef = doc(usersCollection, userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const favorites = userData.favorites || [];

      // Load the offers based on offerIds
      const offers = await Promise.all(favorites.map((offerId) => loadOfferWithPhoto(offerId)));

      return offers;
    } else {
      console.log("User document not found:", userId);
      return [];
    }
  } catch (error) {
    console.error("Error loading user favorites from Firestore:", error);
    throw error;
  }
};