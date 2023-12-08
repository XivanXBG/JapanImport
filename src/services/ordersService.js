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

  
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};
export const getOrderByIdWithOffers = async (orderId) => {
  try {
 
    const orderDocRef = doc(db, "orders", orderId);
    const orderDocSnapshot = await getDoc(orderDocRef);

    if (orderDocSnapshot.exists()) {
      const orderData = orderDocSnapshot.data();

      
      const itemIds = orderData.car_ids;


   
      const offersData = await Promise.all(
        itemIds.map(async (offerId) => {
          const offer = await loadOfferWithPhoto(offerId);
          if (offer !== undefined) {
            
            return offer;
          } else {
            
            
          }
        })
      );

  
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

    

   
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};
export const getOrdersByOwnerId = async (ownerId) => {
    try {
     
      const ordersCollection = collection(db, 'orders');
  
   
      const ordersQuery = query(ordersCollection, where('ownerId', '==', ownerId));
  
     
      const querySnapshot = await getDocs(ordersQuery);
  
     
      const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
      return orders;
    } catch (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
  };