import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import {
  loadCars,
  createOffer,
  loadCriteria,
} from "../../services/offersService";
import styles from "./create.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyles } from "../toastStyle";

const SearchFormKeys = {
  Make: "make",
  Model: "model",
  Price: "price",
  Year: "year",
  TransmissionType: "transmission",
  Killometers: "killometers",
  Category: "category",
  EngineType: "engine",
  Photos: "photos",
  Color: "color",
  Description: "description",
  Loc: "loc",
  Mobile: "mobile",
};

export default function Create() {
  const navigate = useNavigate();
  const create = async (values) => {
    try {
      setIsLoading(true);
      console.log(isLoading);
      toast.dismiss();

      if (!isMaxPriceUnderOneMillion(values.price)) {
        return;
      }
      if (!isMaxYearCurrentYear(values.year)) {
        return;
      }
      if (!isMinYear(values.year)) {
        return;
      }
      if (!maxKillometers(values.killometers)) {
        return;
      }
     
      const res = await createOffer(values);

      navigate("/cars");
    } catch (error) {}
  };
  const { values, onChange, onSubmit } = useForm(create, {
    [SearchFormKeys.Make]: "",
    [SearchFormKeys.Model]: "",
    [SearchFormKeys.Price]: "",
    [SearchFormKeys.Year]: "",
    [SearchFormKeys.TransmissionType]: "",
    [SearchFormKeys.Killometers]: "",
    [SearchFormKeys.Category]: "",
    [SearchFormKeys.EngineType]: "",
    [SearchFormKeys.Photos]: [],
    [SearchFormKeys.Color]: "",
    [SearchFormKeys.Description]: "",
    [SearchFormKeys.Loc]: "",
    [SearchFormKeys.Mobile]: "",
  });

  const [cars, setCars] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCars().then((x) => setCars(x));
    loadCriteria().then((x) => {
      setCriteria(x);
    });
  }, []);

  const getModelsForCarId = (carId) => {
    const car = cars.find((car) => car.id === carId);
    return car ? car.models : null;
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h2 className={styles.h2}>Car Information</h2>
        <hr />
        <div className={styles.row}>
          <div>
            <div className={styles["input-container"]}>
              <label className={styles.label}>Make:</label>
              <select
                name={SearchFormKeys.Make}
                onChange={onChange}
                value={values[SearchFormKeys.Make]}
                className={styles.select}
                required
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
                required
              >
                <option value="">Select engine</option>
                {criteria.fuelTypes?.map((car) => (
                  <option key={car} value={car}>
                    {car}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles["input-container"]}>
              <label className={styles.label}>Category:</label>
              <select
                name={SearchFormKeys.Category}
                onChange={onChange}
                value={values[SearchFormKeys.Category]}
                className={styles.select}
                required
              >
                <option value="">Select category</option>
                {criteria.bodyTypes?.map((car) => (
                  <option key={car} value={car}>
                    {car}
                  </option>
                ))}
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
                required
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
                required
              >
                <option value="">Select transmission type</option>
                {criteria.transmissionTypes?.map((car) => (
                  <option key={car} value={car}>
                    {car}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles["input-container"]}>
              <label className={styles.label}>Color:</label>
              <select
                name={SearchFormKeys.Color}
                onChange={onChange}
                value={values[SearchFormKeys.Color]}
                className={styles.select}
                required
              >
                <option value="">Select Color</option>
                {criteria.carColors?.map((car) => (
                  <option key={car} value={car}>
                    {car}
                  </option>
                ))}
              </select>
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
              required
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
              required
            />
          </div>
          <div className={styles.numberInput}>
            <label className={styles.label}>Kilometers:</label>
            <input
              name={SearchFormKeys.Killometers}
              type="number"
              onChange={onChange}
              value={values[SearchFormKeys.Killometers]}
              step="10000"
              placeholder="0"
              required
            />
          </div>
        </div>
        <hr />
        <div className={styles.moreInfoAndPhotos}>
          <div className={styles.description}>
            <label className={styles.label}>More Information:</label>
            <input
              type="text"
              name={SearchFormKeys.Description}
              onChange={onChange}
              value={values[SearchFormKeys.Description]}
              placeholder="Description"
              className={styles.moreInfo}
              required
            />
          </div>

          <div className={styles.fileInput}>
            <label className={styles.label}>Photos:</label>
            <input
              type="file"
              name={SearchFormKeys.Photos}
              multiple
              onChange={onChange}
              className={styles.moreInfo}
              required
            />
          </div>
        </div>
        <hr />

        <div className={styles.personalInfo}>
          <h3 className={styles.h3}>Personal Info:</h3>
          <div className={styles.mobileInput}>
            <label className={styles.label}>Mobile:</label>
            <input
              type="mobile"
              name={SearchFormKeys.Mobile}
              onChange={onChange}
              value={values[SearchFormKeys.Mobile]}
              placeholder="mobilephone"
              className={styles.mobile}
              required
            />
          </div>
          <div className={styles.numberInput}>
            <label className={styles.label}>Location:</label>
            <select
              name={SearchFormKeys.Loc}
              onChange={onChange}
              value={values[SearchFormKeys.Loc]}
              className={styles.select}
              required
            >
              <option value="">Select location</option>
              {criteria.citiesWithPortsAndAirports?.map((car) => (
                <option key={car} value={car}>
                  {car}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.btnWrapper}>
        <button disabled={isLoading} type="submit" className={styles.button}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
function isMaxPriceUnderOneMillion(maxPrice) {
  if (maxPrice < 1000000) {
    return true;
  } else {
    toast.error("Maximum price must be under 1000000", toastStyles);
    return false;
  }
}
function maxKillometers(killometers) {
  if (killometers < 1000000) {
    return true;
  } else {
    toast.error("Maximum killometers must be under 1000000", toastStyles);
    return false;
  }
}
function isMaxYearCurrentYear(maxYear) {
  if (maxYear <= 2023) {
    return true;
  } else {
    toast.error("Maximum year must be under 2024", toastStyles);
    return false;
  }
}
function isMinYear(minYear) {
  if (minYear >= 1980) {
    return true;
  } else {
    toast.error("Minimun year must be over 1980", toastStyles);
    return false;
  }
}
