import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./Cars.module.css";
import { searchCarOffers } from "../../services/searchService.js";
import Aside from "./aside/aside";
import CarItem from "./carItem/carItem";

const Cars = ({ searchCriteria }) => {
  const [cars, setCars] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("");

  useEffect(() => {
    searchCarOffers(searchCriteria).then((x) => {
      
      const sortedCars = sortCars(x, selectedSortOption);

      setCars(sortedCars);
      setisLoaded(true);
    });
  }, [searchCriteria, selectedSortOption]);

  const handleSortChange = (e) => {
    setSelectedSortOption(e.target.value);
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
                <select onChange={handleSortChange} name="sort" id="">
                  <option value="priceAC">Price ascending</option>
                  <option value="priceDC">Price decending</option>
                  <option value="name">Name</option>
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
};
const mapStateToProps = (state) => ({
  searchCriteria: state,
});

export default connect(mapStateToProps)(Cars);

const sortCars = (cars, sortOption) => {
  
  switch (sortOption) {
    case "priceAC":
      
      return cars.slice().sort((a, b) => a.price - b.price);
    case "priceDC":
      return cars.slice().sort((a, b) => b.price - a.price);
    case "name":
      return cars.slice().sort((a, b) => a.make.localeCompare(b.make));
    default:
   
      return cars.slice();
  }

};
