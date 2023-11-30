// Cars.jsx
import React, { useEffect, useState } from "react";
import { loadAllOffersWithPhotos } from "../../services/carsService";
import styles from "./Cars.module.css";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAllOffersWithPhotos().then((x) => setCars(x));
  }, []);

  const handleCardClick = (id) => {
    // Redirect to the detailed view or wherever you want
    navigate(`/car/${id}`);
  };

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.filterMenu}>
        <h2>Filter Menu</h2>
        <label>Engine Type:</label>
        <select>
          <option value="gasoline">Gasoline</option>
          <option value="diesel">Diesel</option>
          {/* Add other filter options as needed */}
        </select>

        <label>Price:</label>
        <input type="range" min="0" max="100000" />

        <label>Make:</label>
        <input type="text" />

        <label>Model:</label>
        <input type="text" />

        <label>Transmission:</label>
        <select>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>

        <label>Category:</label>
        <select>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          {/* Add other filter options as needed */}
        </select>

        <label>Kilometers:</label>
        <input type="range" min="0" max="500000" />

        <label>Year:</label>
        <input type="number" min="1900" max="2023" />

        {/* Add more filter options as needed */}
        <button>Apply Filters</button>
      </aside>
      <div className={styles.cardContainer}>
        {cars.map((car) => (
          <div
            key={car.id}
            className={styles.card}
            onClick={() => handleCardClick(car.id)}
          >
            <img src={car.photos} alt="Car" className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h1>{car.name}</h1>
              <p>{`${car.make} ${car.model}`}</p>
              <p>{`Price: $${car.price}`}</p>
              {/* Add other information as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
