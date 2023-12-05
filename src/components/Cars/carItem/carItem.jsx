import { useState, useContext } from "react";
import styles from "./carItem.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/authContext";
import { updateUserFavoritesInFirestore } from "../../../services/carsService";
const Wrapper = {
  position: 'relative',
};

const HeartIcon = {
  position: 'absolute',
  top: '0',
  right: '0',
  cursor: 'pointer',
  fontSize:'2.5rem', 
}
export default function CarItem({ car }) {
  const { user,isAuthenticated } = useContext(AuthContext);
  const favoriteHandler = () => {
    if (user) {
      
      updateUserFavoritesInFirestore(user.uid, car.id)
        .then(() => {
          console.log("Favorite added successfully!");
        })
        .catch((error) => {
          console.error("Error adding favorite:", error);
        });
    } else {
      console.error("User not authenticated");
    }
  }
  const navigate = useNavigate();
  return (
    <div style={Wrapper} className={styles.wrapper}>
      {isAuthenticated && (
        <i
        style={HeartIcon}
        onClick={favoriteHandler}
        className="fa-regular fa-heart"
      ></i>
      )}
      
      <div onClick={() => navigate(`/cars/${car.id}`)} className={styles.card}>
        <div className={styles.image}>
          <img className={styles.img} src={car?.photos[0]} alt="car" />
        </div>
        <div className={styles.moreInfo}>
          <div className={styles.wishlistHeader}>
            <h3 className={styles.name}>
              {car.make} {car.model}
            </h3>
          </div>

          <p className={styles.fAwesome}>
            <i className="fa-solid fa-location-dot"></i>
            <span> {car.loc}</span>
          </p>
          <h2 className={styles.price}>${car.price}</h2>

          <div className={styles.condensedInfo}>
            <div>
              <p className={styles.desc}>{car.year}</p>

              <p className={styles.desc}>{car.color}</p>
            </div>
            <hr />
            <div>
              <p className={styles.desc}>{car.engine}</p>
              <p className={styles.desc}>{car.killometers} km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
