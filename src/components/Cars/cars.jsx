// Cars.jsx
import React, { useEffect, useState } from "react";
import { loadAllOffersWithPhotos } from "../../services/carsService";
import styles from "./Cars.module.css";
import { useNavigate } from "react-router-dom";
import Aside from "./aside/aside";
import CarItem from "./carItem/carItem";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadAllOffersWithPhotos().then((x) => {
      setCars(x);
      setisLoaded(true);
    });
  }, []);

  const handleCardClick = (id) => {
    // Redirect to the detailed view or wherever you want
    navigate(`/car/${id}`);
  };

  return (
    <>
      {isLoaded && (
        <div className={styles.wrapper}>
          <div className={styles.pageContainer}>
            <aside className={styles.filterMenu}>
              <Aside />
            
            </aside>
            <div>
              <div className={styles.sort}>
                <p htmlFor="sort">Sort by:</p>
                <select name="sort" id="">
                  <option value="">Price</option>
                </select>
              </div>
              <div className={styles.cardContainer}>
                {cars.map((car) => (
                  <CarItem key={car.id} car={car} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
