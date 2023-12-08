import { db } from "../utils/firebase.ts";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
  query,
  where
} from "firebase/firestore";
import { loadOfferWithPhoto } from "./offersService.js";
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
      // const offersData = await Promise.all(
      //   itemIds.map((itemId) => loadOfferWithPhoto(itemId))
      // );
      const offersData = await Promise.all(
        itemIds.map(async (offerId) => {
          const offer = await loadOfferWithPhoto(offerId);
          if (offer !== undefined) {
            console.log("Offer:", offer);
            return offer;
          } else {
            console.log(`Offer with ID ${offerId} not found or deleted.`);
            
          }
        })
      );

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
    const ordersCollection = collection(db, "orders");
    const docRef = await addDoc(ordersCollection, orderData);

    // Log the ID of the newly created document
    console.log("Document ID:", docRef.id);

    // Return the ID if needed
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error; // Optionally rethrow the error
  }
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