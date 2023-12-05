import { db } from "../utils/firebase.ts";
import { collection, getDocs,getDoc, addDoc,deleteDoc,doc } from "firebase/firestore";

export const loadReviews = async () => {
  const reviewsCollection = collection(db, "reviews");
  const snapshot = await getDocs(reviewsCollection);

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
};
export const addReviewToFirestore = async (reviewData) => {
  try {
    const reviewsCollection = collection(db, "reviews");
    const docRef = await addDoc(reviewsCollection, reviewData);
   
    const docSnapshot = await getDoc(docRef);
    const createdReview = { id: docSnapshot.id, ...docSnapshot.data() };

    console.log("Review added to Firestore successfully!");
    
    // Return the created review data
    return createdReview;
  } catch (error) {
    console.error("Error adding review to Firestore:", error.message);
    throw error; // Re-throw the error to handle it in the calling code if needed
  }
};
export const removeReviewById = async (reviewId) => {
  try {
    const reviewsCollection = collection(db, "reviews");
    const reviewDocRef = doc(reviewsCollection, reviewId);

    await deleteDoc(reviewDocRef);

    console.log(`Review with ID ${reviewId} removed from Firestore successfully!`);
  } catch (error) {
    console.error("Error removing review from Firestore:", error.message);
  }
};
