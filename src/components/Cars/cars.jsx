// Cars.jsx
import React, { useEffect, useState } from "react";
import { loadAllOffersWithPhotos } from "../../services/carsService";
import styles from "./Cars.module.css";
import { useNavigate } from "react-router-dom";
import Aside from "./aside/aside";



const Cars = () => {
  const [cars, setCars] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photos, setPhotos] = useState(0);
  const [isLoaded, setisLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadAllOffersWithPhotos().then((x) => {setCars(x);setisLoaded(true);});
   
   
  }, []);

  const handleCardClick = (id) => {
    // Redirect to the detailed view or wherever you want
    navigate(`/car/${id}`);
  };
 

  

  return (
    (isLoaded && (
      <div className={styles.pageContainer}>
      <div className={styles.wrapperContent}>
      <aside className={styles.filterMenu}>
        <Aside/>
        <button>Apply Filters</button>
      </aside>
      <div className={styles.cardContainer}>
        {cars.map((car) => (
          
          <div
            key={car.id}
            className={styles.card}
            onClick={() => handleCardClick(car.id)}
          >
            <img src={car.photos[currentPhotoIndex]} alt="Car" className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h1>{car.name}</h1>
              <p>{`${car.make} ${car.model}`}</p>
              <p>{`Price: $${car.price}`}</p>

            </div>
          </div>
        ))}
      </div>
      </div>
      
    </div>
    ))
   
  );
};

export default Cars;
