import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { loadCars,createOffer } from "../../services/carsService";
import styles from "./create.module.css";

const SearchFormKeys = {
  Make: "make",
  Model: "model",
  Price: "price",
  Year: "year",
  TransmissionType: "transmission",
  Killomenters: "killometers",
  Category: "category",
  EngineType: "engine",
  Photos: "photos",
};

export default function Create() {
  
  const { values, onChange, onSubmit } = useForm(createOffer, {
    [SearchFormKeys.Make]: "",
    [SearchFormKeys.Model]: "",
    [SearchFormKeys.Price]: "",
    [SearchFormKeys.Year]: "",
    [SearchFormKeys.TransmissionType]: "",
    [SearchFormKeys.Killomenters]: "",
    [SearchFormKeys.Category]: "",
    [SearchFormKeys.EngineType]: "",
    [SearchFormKeys.Photos]: [],
  });

  const [cars, setCars] = useState([]);

  useEffect(() => {
    loadCars().then((cars) => setCars(cars));
    console.log(cars);
  }, []);

  const getModelsForCarId = (carId) => {
    const car = cars.find((car) => car.id === carId);
    return car ? car.models : null;
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.row}>
          <div>
            <div className={styles["input-container"]}>
              <label className={styles.label}>Make:</label>
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
            <div className={styles["input-container"]}>
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
            <div className={styles["input-container"]}>
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
          </div>

          <div>
            <div className={styles["input-container"]}>
              <label className="label">Model:</label>
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
                    {getModelsForCarId(values[SearchFormKeys.Make]).map(
                      (model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      )
                    )}
                  </>
                )}
              </select>
            </div>
            <div className={styles["input-container"]}>
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
            <div className={styles["input-container"]}>
              <label className={styles.label}>Photos:</label>
              <input
                type="file"
                name={SearchFormKeys.Photos}
                onChange={onChange}
                multiple
                className={styles.images}
              />
            </div>
          </div>
        </div>

        <div className={styles.numberInputs}>
          <div className={styles.numberInput}>
            <label className={styles.label}>Year:</label>
            <input
              type="number"
              name={SearchFormKeys.Year}
              onChange={onChange}
              step="10"
              value={values[SearchFormKeys.Year]}
              placeholder="0"
            />
          </div>
          <div className={styles.numberInput}>
            <label className={styles.label}>Price:</label>
            <input
              type="number"
              name={SearchFormKeys.Price}
              onChange={onChange}
              value={values[SearchFormKeys.Price]}
              step="1000"
              placeholder="0"
            />
          </div>
          <div className={styles.numberInput}>
            <label className={styles.label}>Kilometers:</label>
            <input
              name={SearchFormKeys.Killomenters}
              type="number"
              onChange={onChange}
              value={values[SearchFormKeys.Killomenters]}
              step="10000"
              placeholder="0"
            />
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
