import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase.ts';

export const searchCarOffers = async (searchCriteria) => {
  const offersCollection = collection(db, 'offers');

  // Start with a base query
  let baseQuery = query(offersCollection);

  // Apply filters based on search criteria
  if (searchCriteria.make) {
    baseQuery = query(baseQuery, where('make', '==', searchCriteria.make));
  }

  if (searchCriteria.model) {
    baseQuery = query(baseQuery, where('model', '==', searchCriteria.model));
  }

  if (searchCriteria.price) {
    baseQuery = query(baseQuery, where('price', '==', searchCriteria.price));
  }

  if (searchCriteria.category) {
    baseQuery = query(baseQuery, where('category', '==', searchCriteria.category));
  }

  if (searchCriteria.ownerId) {
    baseQuery = query(baseQuery, where('ownerId', '==', searchCriteria.ownerId));
  }

  try {
    // Execute the query and get the documents
    const querySnapshot = await getDocs(baseQuery);

    // Extract the data from the querySnapshot
    const offers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return offers;
  } catch (error) {
    console.error('Error searching car offers:', error);
    throw error;
  }
};
