import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./Cars.module.css";
import { searchCarOffers } from "../../services/searchService.js";
import Aside from "./aside/aside";
import CarItem from "./carItem/carItem";
import Spinner from "../Spinner/spinner.jsx";

const Cars = ({ searchCriteria }) => {
  const [cars, setCars] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(10);

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

  const handlePageChange = (newPageNumber) => {
    if (
      newPageNumber >= 1 &&
      newPageNumber <= Math.ceil(cars.length / carsPerPage)
    ) {
      setPageNumber(newPageNumber);
    }
  };

  const handleNextPage = () => {
    const nextPage = pageNumber + 1;
    handlePageChange(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = pageNumber - 1;
    handlePageChange(prevPage);
  };
  const handleCarsPerPageChange = (e) => {
    const newCarsPerPage = parseInt(e.target.value, 10);
    setCarsPerPage(newCarsPerPage);
    setPageNumber(1); 
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
                  <option value="priceDC">Price descending</option>
                  <option value="name">Name</option>
                </select>
                <p className={styles.sort}>Cars per page:</p>
                <select
                  id="carsPerPage"
                  value={carsPerPage}
                  onChange={handleCarsPerPageChange}
                  style={{ width: "60px" }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={40}>40</option>
                </select>
              </div>
              <div className={styles.displayOptions}></div>
              {cars.length > 0 && (
                <div className={styles.cardContainer}>
                  {cars
                    .slice(
                      (pageNumber - 1) * carsPerPage,
                      pageNumber * carsPerPage
                    )
                    .map((car) => (
                      <CarItem key={car.id} car={car} />
                    ))}
                </div>
              )}
              {cars.length === 0 && (
                <div>
                  <h1 style={{ textAlign: "center" }}>No offers found!</h1>
                </div>
              )}
              <div className={styles.pagination}>
                <button className={styles.pagBtn} onClick={handlePrevPage} disabled={pageNumber === 1}>
                  Previous
                </button>
                {Array.from({
                  length: Math.ceil(cars.length / carsPerPage),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`${styles.pageButton} ${
                      pageNumber === index + 1 ? styles.activePage : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={pageNumber === Math.ceil(cars.length / carsPerPage)}
                  className={styles.pagBtn}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoaded && <Spinner />}
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
