import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import CarItem from "../Cars/carItem/carItem";
import { loadUserFavoritesFromFirestore } from "../../services/favoritesService";
import styles from "./wishlist.module.css";

export default function Wishlist() {
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    loadUserFavoritesFromFirestore(user.uid).then((x) => {
      setOffers(x);

    });
   
  }, []);

  const removeFromState = (id) => {

    setOffers((state) => state.filter((state) => state.id != id));
  };
  return (
    <>
      {offers?.length > 0 && (
        <>
          <h1 className={styles.heading}>My Offers:</h1>
          <div className={styles.cardContainer}>
            {offers.map((car) => (
              <CarItem
                key={car.id}
                removeFromState={removeFromState}
                removeFavorite={true}
                car={car}
              />
            ))}
          </div>
        </>
      )}
      {offers?.length == 0 && <h1>No favorite offers!</h1>}
    </>
  );
}
