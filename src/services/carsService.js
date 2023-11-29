import { db } from "../utils/firebase.ts";
import { collection, getDocs } from "firebase/firestore";

export const loadCars = async () => {
  const carsCollection = await collection(db, "cars");
  const snapshot = await getDocs(carsCollection);

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return data;
};
