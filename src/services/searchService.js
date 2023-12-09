import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase.ts";

export const searchCarOffers = async (searchCriteria) => {
  const offersCollection = collection(db, "offers");

 
  let baseQuery = query(offersCollection);



  if (searchCriteria?.make) {
    baseQuery = query(baseQuery, where("make", "==", searchCriteria.make));
  }

  if (searchCriteria?.model) {
    baseQuery = query(baseQuery, where("model", "==", searchCriteria.model));
  }

 
  if (searchCriteria?.transmissionType) {
    baseQuery = query(
      baseQuery,
      where("transmission", "==", searchCriteria.transmissionType)
    );
  }
  if (searchCriteria?.killometers) {
    baseQuery = query(
      baseQuery,
      where("killometers", "<=", Number(searchCriteria.killometers))
    );
  }
  if (searchCriteria?.category) {
    baseQuery = query(
      baseQuery,
      where("category", "==", searchCriteria.category)
    );
  }

  if (searchCriteria?.engineType) {
    baseQuery = query(
      baseQuery,
      where("engine", "==", searchCriteria.engineType)
    );
  }
  if (searchCriteria?.color) {
    baseQuery = query(baseQuery, where("color", "==", searchCriteria.color));
  }
  if (searchCriteria?.loc) {
    baseQuery = query(baseQuery, where("loc", "==", searchCriteria.loc));
  }

  if (searchCriteria?.ownerId) {
   
    baseQuery = query(
      baseQuery,
      where("ownerId", "==", searchCriteria.ownerId)
    );
  
  }

  try {
    const baseQuerySnapshot = await getDocs(baseQuery);

   
    const baseOffers = baseQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const priceOffers = await executePriceQuery(searchCriteria);
    const yearOffers = await executeYearQuery(searchCriteria);
    const kilometerOffers = await executeKilometerQuery(searchCriteria);


    const filteredOffers = baseOffers
      .filter((baseOffer) =>
        priceOffers.some((priceOffer) => priceOffer.id === baseOffer.id)
      )
      .filter((baseOffer) =>
        yearOffers.some((yearOffer) => yearOffer.id === baseOffer.id)
      )
      .filter((baseOffer) =>
        kilometerOffers.some(
          (kilometerOffer) => kilometerOffer.id === baseOffer.id
        )
      );

    return filteredOffers;
  } catch (error) {
    console.error("Error searching car offers:", error);
    throw error;
  }
};

const executePriceQuery = async (searchCriteria) => {
  let priceQuery = query(collection(db, "offers"));

  if (searchCriteria?.minPrice && searchCriteria?.maxPrice) {
    
    priceQuery = query(
      priceQuery,
      where("price", ">=", Number(searchCriteria.minPrice)),
      where("price", "<=", Number(searchCriteria.maxPrice))
    );
  } else if (searchCriteria?.minPrice) {
    
    priceQuery = query(
      priceQuery,
      where("price", ">=", Number(searchCriteria.minPrice))
    );
  } else if (searchCriteria?.maxPrice) {
   
    priceQuery = query(
      priceQuery,
      where("price", "<=", Number(searchCriteria.maxPrice))
    );
  }

  const priceQuerySnapshot = await getDocs(priceQuery);

  return priceQuerySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const executeYearQuery = async (searchCriteria) => {
  let yearQuery = query(collection(db, "offers"));

  if (searchCriteria?.minYear && searchCriteria?.maxYear) {
    
    yearQuery = query(
      yearQuery,
      where("year", ">=", Number(searchCriteria.minYear)),
      where("year", "<=", Number(searchCriteria.maxYear))
    );
  } else if (searchCriteria?.minYear) {
    
    yearQuery = query(
      yearQuery,
      where("year", ">=", Number(searchCriteria.minYear))
    );
  } else if (searchCriteria?.maxYear) {
 
    yearQuery = query(
      yearQuery,
      where("year", "<=", Number(searchCriteria.maxYear))
    );
  }

  const yearQuerySnapshot = await getDocs(yearQuery);

  return yearQuerySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const executeKilometerQuery = async (searchCriteria) => {
  let kilometerQuery = query(collection(db, "offers"));

  if (searchCriteria?.killometers) {
    kilometerQuery = query(
      kilometerQuery,
      where("killometers", "<=", Number(searchCriteria.killometers))
    );
  }

  const kilometerQuerySnapshot = await getDocs(kilometerQuery);

  return kilometerQuerySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
