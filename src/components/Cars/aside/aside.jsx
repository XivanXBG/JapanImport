import { loadCars } from "../../../services/carsService";
import useForm from "../../../hooks/useForm";
import { useEffect, useState } from "react";
import styles from "./aside.module.css";

export default function Aside() {
  const SearchFormKeys = {
    Make: "make",
    Model: "model",
    MinPrice: "minPrice",
    MaxPrice: "maxPrice",
    MinYear: "minYear",
    MaxYear: "maxYear",
    TransmissionType: "transmission",
    Killomenters: "killometers",
    Category: "category",
    EngineType: "engine",
    Color: "color",
    Loc: "loc",
  };

  const search = (values) => {
    console.log(values);
  };
  const getModelsForCarId = (carId) => {
    const car = cars.find((car) => car.id === carId);
    return car ? car.models : null;
  };
  const [cars, setCars] = useState([]);
  useEffect(() => {
    loadCars().then((x) => setCars(x));
  }, []);

  let { values, onChange, onSubmit } = useForm(search, {
    [SearchFormKeys.Make]: "",
    [SearchFormKeys.Model]: "",
    [SearchFormKeys.MinPrice]: "",
    [SearchFormKeys.MaxPrice]: "",
    [SearchFormKeys.MaxYear]: "",
    [SearchFormKeys.MinYear]: "",
    [SearchFormKeys.TransmissionType]: "",
    [SearchFormKeys.Killomenters]: "",
    [SearchFormKeys.Category]: "",
    [SearchFormKeys.EngineType]: "",
    [SearchFormKeys.Color]: "",
    [SearchFormKeys.Loc]: "",
  });
  return (
    <form onSubmit={onSubmit} className={styles.asideForm}>
      <div className={styles.search}>
        <div className={styles.resetFormWrapper}>
          <label className={styles.label}>Make:</label>
          <button className={styles.reset}>Reset</button>
        </div>

        <select
          name={SearchFormKeys.Make}
          onChange={onChange}
          value={values[SearchFormKeys.Make]}
          className={styles.select}
        >
          <option value="">Select make</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.id}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.search}>
        <label className={styles.label}>Model:</label>
        <select
          name={SearchFormKeys.Model}
          onChange={onChange}
          className={styles.select}
        >
          {values[SearchFormKeys.Make] === "" ? (
            <option value="">Select a model</option>
          ) : (
            <>
              <option value="">Select a model</option>
              {getModelsForCarId(values[SearchFormKeys.Make]).map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
      <div className={styles.search}>
        <label className={styles.label}>Year:</label>
        <div className={styles.inputsNumber}>
          <input
            type="number"
            name={SearchFormKeys.MinYear}
            onChange={onChange}
            value={values[SearchFormKeys.MinYear]}
            placeholder="1980"
          />
          -
          <input
            type="number"
            name={SearchFormKeys.MaxYear}
            onChange={onChange}
            value={values[SearchFormKeys.MaxYear]}
            placeholder="2023"
          />
        </div>
      </div>
      <div className={styles.search}>
        <label className={styles.label}>Price:</label>
        <div className={styles.inputsNumber}>
          <input
            type="number"
            name={SearchFormKeys.MinPrice}
            onChange={onChange}
            value={values[SearchFormKeys.MinPrice]}
            placeholder="1000"
          />
          -
          <input
            type="number"
            name={SearchFormKeys.MaxPrice}
            onChange={onChange}
            value={values[SearchFormKeys.MaxPrice]}
            placeholder="50000"
          />
        </div>
      </div>
      <div className={styles.search}>
        <label className={styles.label}>Engine Type:</label>
        <select
          name={SearchFormKeys.EngineType}
          onChange={onChange}
          value={values[SearchFormKeys.EngineType]}
          className={styles.select}
        >
          <option value="">Select engine</option>
          <option value="gasoline">Gasoline</option>
          <option value="diesel">Diesel</option>
          <option value="hybrid">Hybrid</option>
          <option value="electric">Electric</option>
        </select>
      </div>
      <div className={styles.search}>
        <label className={styles.label}>Category:</label>
        <select
          name={SearchFormKeys.Category}
          onChange={onChange}
          value={values[SearchFormKeys.Category]}
          className={styles.select}
        >
          <option value="">Select category</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="coupe">Coupe</option>
          <option value="convertible">Convertible</option>
          <option value="hatchback">Hatchback</option>
          <option value="wagon">Wagon</option>
          <option value="pickup">Pickup Truck</option>
          <option value="minivan">Minivan</option>
          <option value="crossover">Crossover</option>
          <option value="sportsCar">Sports Car</option>
        </select>
      </div>
      <div className={styles.search}>
        <label className={styles.label}>Color:</label>
        <select
          name={SearchFormKeys.Color}
          onChange={onChange}
          value={values[SearchFormKeys.Color]}
          className={styles.select}
        >
          <option value="">Select color</option>
          <option value="blue">blue</option>
          <option value="red">red</option>
        </select>
      </div>
      <div className={styles.search}>
        <label className={styles.label}>Transmission:</label>
        <select
          name={SearchFormKeys.TransmissionType}
          onChange={onChange}
          value={values[SearchFormKeys.TransmissionType]}
          className={styles.select}
        >
          <option value="">Select transmission type</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </div>
      <div className={styles.search}>
        <label className={styles.label}>Max Kilometers:</label>
        <select
          name={SearchFormKeys.Killomenters}
          onChange={onChange}
          value={values[SearchFormKeys.Killomenters]}
          className={styles.select}
        >
          <option value="">Select max km</option>
          <option value="10000">Under 10,000 km</option>
          <option value="30000">Under 30,000 km</option>
          <option value="50000">Under 50,000 km</option>
          <option value="100000">Under 100,000 km</option>
          <option value="200000">Under 200,000 km</option>
        </select>
      </div>

      <div className={styles.search}>
        {" "}
        <label className={styles.label}>Location:</label>
        <select
          name={SearchFormKeys.Loc}
          onChange={onChange}
          value={values[SearchFormKeys.Loc]}
          className={styles.select}
        >
          <option value="">Select location</option>
          <option value="hiroshima">Hiroshima</option>
          <option value="nagasaki">Nagasaki</option>
        </select>
      </div>
      <button className={styles.filter}>Apply Filters</button>
    </form>
  );
}
