import styles from "./details.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadOfferWithPhoto } from "../../services/carsService";

export default function Details() {
  const { offerId } = useParams();
  const [offer, setOffer] = useState({});
  useEffect(() => {
    loadOfferWithPhoto(offerId).then((x) => setOffer(x));
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.detailsCard}>
        <div className={styles.photoWrapper}>
          <img className={styles.photo} src={offer.photos} alt={offer.make} />
        </div>
        <div className={styles.detailsInfo}>
          <div>
            
          </div>
          <h2>
            {offer.make} {offer.model}
          </h2>
          <p>Category: {offer.category}</p>
          <p>Year: {offer.year}</p>
          <p>Price: {offer.price}</p>
          <p>Kilometers: {offer.killometers}</p>
          <p>Color: {offer.color}</p>
          <p>Engine: {offer.engine}</p>
          <p>Transmission: {offer.transmission}</p>
        </div>
      </div>
    </div>
  );
}
