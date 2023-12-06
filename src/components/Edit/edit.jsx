import { useEffect, useState } from "react";
import {
  loadCars,
  updateOffer,
  loadOfferWithPhoto,
} from "../../services/carsService";
import styles from "./edit.module.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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

export default function Edit() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [offer, setOffers] = useState({});
  const [value, setValues] = useState({
    [SearchFormKeys.Make]: offer.make || '',
    [SearchFormKeys.Model]: offer.model ||'',
    [SearchFormKeys.Price]: offer.price||'',
    [SearchFormKeys.Year]: offer.year||'',
    [SearchFormKeys.TransmissionType]: offer.transmission||'',
    [SearchFormKeys.Killometers]: offer.killometers||'',
    [SearchFormKeys.Category]: offer.category||'',
    [SearchFormKeys.EngineType]: offer.engine||'',
    [SearchFormKeys.Photos]: [],
    [SearchFormKeys.Color]: offer.color||'',
    [SearchFormKeys.Description]: offer.description||'',
    [SearchFormKeys.Loc]: offer.loc||'',
    [SearchFormKeys.Mobile]: offer.mobile||'',
  });
  console.log(offer);
  console.log(value);
  const [isLoaded, setIsLoaded] = useState(false);
  const { offerId } = useParams();
  const onChange = (e) => {
    let target = e.target.name;

    if (e.target.value <= 0) {
      e.target.value = "";
    }
    if (target === "make") {
      setValues((state) => ({
        ...state,
        [target]: e.target.value,
        model: "",
      }));
    } else if (target === "photos") {
      const selectedPhotos = Array.from(e.target.files);
      setValues((state) => ({
        ...state,
        [target]: selectedPhotos,
      }));
    } else {
      setValues((state) => ({
        ...state,
        [target]: e.target.value,
      }));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsData = await loadCars();
        setCars(carsData);

        loadOfferWithPhoto(offerId).then((x) => {
          setValues(x);
          setOffers(x);
        });

        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  const edit = async(e) => {
    e.preventDefault()
    try {
      toast.dismiss();

      if (!isMaxPriceUnderOneMillion(value.price)) {
        console.log(mas1);
        return;
      }
      if (!isMaxYearCurrentYear(value.year)) {
        console.log(mas2);
     
        return;
      }
      if (!isMinYear(value.year)) {
        console.log(mas3);
      
        return;
      }if (!maxKillometers(value.killometers)) {
        console.log(mas4);
        
        return;
      }

      const res = await updateOffer(offerId,value);
      navigate(`/cars/${offerId}`);
      
    } catch (error) {
      // Handle other errors if needed
    }
    
  };

  const getModelsForCarId = (carId) => {
    const car = cars.find((car) => car.id === carId);
    return car ? car.models : null;
  };
  return (
    <>
      {isLoaded && (
        <div className={styles.wrapper}>
          <form onSubmit={edit} className={styles.form}>
            <h3>Car Information</h3>
            <hr />
            <div className={styles.row}>
              <div>
                <div className={styles["input-container"]}>
                  <label className={styles.label}>Make:</label>
                  <select
                    name={SearchFormKeys.Make}
                    onChange={onChange}
                    value={value.make}
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
                    value={value.engine}
                    className={styles.select}
                    required
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
                    value={value.category}
                    className={styles.select}
                    required
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
                    required
                  >
                    {offer.make === "" ? (
                  <option value=''>Select a model</option>
                ) : (
                  <>
                    <option value={offer.model}>Select model</option>
                    {getModelsForCarId(offer.make)?.map(
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
                    value={value.transmission}
                    className={styles.select}
                    required
                  >
                    <option value="">Select transmission type</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
                <div className={styles["input-container"]}>
                  <label className={styles.label}>Color:</label>
                  <select
                    name={SearchFormKeys.Color}
                    onChange={onChange}
                    value={value.color}
                    className={styles.select}
                    required
                  >
                    <option value="">Select Color</option>
                    <option value="red">red</option>
                    <option value="green">green</option>
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
                  value={value.year}
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
                  value={value.price}
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
                  value={value.killometers}
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
                  value={value.description}
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
              <h3>Personal Info:</h3>
              <div className={styles.mobileInput}>
                <label className={styles.label}>Mobile:</label>
                <input
                  type="mobile"
                  name={SearchFormKeys.Mobile}
                  onChange={onChange}
                  value={value.mobile}
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
                  value={value.loc}
                  className={styles.select}
                  required
                >
                  <option value="">Select location</option>
                  <option value="hiroshima">Hiroshima</option>
                  <option value="tokyo">Tokyo</option>
                </select>
              </div>
            </div>
            <div className={styles.btnWrapper}>
              <button type="submit" className={styles.button}>
                Edit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
function isMaxPriceUnderOneMillion(maxPrice) {
  if (maxPrice < 1000000) {
    return true;
  } else {
    // Throw a toast error if maxPrice is not under 1000000
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
    // Throw a toast error if maxPrice is not under 1000000
    toast.error("Maximum year must be under 2024", toastStyles);
    return false;
  }
}
function isMinYear(minYear) {
  if (minYear >= 1980) {
    return true;
  } else {
    // Throw a toast error if maxPrice is not under 1000000
    toast.error("Minimun year must be over 1980", toastStyles);
    return false;
  }
}

