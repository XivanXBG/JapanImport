import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { loadOffersByOwnerId } from "../../services/carsService";
import CarItem from "../Cars/carItem/carItem";
import styles from './myOffers.module.css'
const MyOffers = ({ dispatch, searchCriteria }) => {
  const { userId } = useParams();
  console.log(userId);
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    loadOffersByOwnerId(userId).then((x) => setOffers(x));
  }, []);

  return (
    <>
    <h1 className={styles.heading}>My Offers:</h1>
    <div className={styles.cardContainer}>
        
    {offers.map((car) => (
      <CarItem key={car.id} car={car}/>
    ))}
  </div>
    </>
    
  
  );
};

export default MyOffers;
