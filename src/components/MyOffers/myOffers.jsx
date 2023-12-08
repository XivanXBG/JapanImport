import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { loadOffersByOwnerId } from "../../services/offersService";
import CarItem from "../Cars/carItem/carItem";
import styles from "./myOffers.module.css";
const MyOffers = ({ dispatch, searchCriteria }) => {
  const { userId } = useParams();

  const [offers, setOffers] = useState([]);
  useEffect(() => {
    loadOffersByOwnerId(userId).then((x) => setOffers(x));
  }, []);

  return (
    <>
      <div style={{ minHeight: "calc(100vh - 160px)", height: "auto" }}>
        
        {offers.length > 0 && (
          <>
          <h1 className={styles.heading}>My Offers:</h1>
          <div className={styles.cardContainer}>
            {offers.map((car) => (
              <CarItem key={car.id} car={car} />
            ))}
          </div>
          </>
          
        )}
        {offers.length == 0 && (
          <h1>No offers created!</h1>
        )}
      </div>
    </>
  );
};

export default MyOffers;
