import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./Cars.module.css";
import { searchCarOffers } from "../../services/searchService.js";
import Aside from "./aside/aside";
import CarItem from "./carItem/carItem";

const Cars = ({ searchCriteria }) => {
  const [cars, setCars] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    searchCarOffers(searchCriteria).then((x) => {
      setCars(x);
      setisLoaded(true);
     
    });
  }, [searchCriteria]);

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
};
const mapStateToProps = (state) => ({
  searchCriteria: state,
});

export default connect(mapStateToProps)(Cars);
