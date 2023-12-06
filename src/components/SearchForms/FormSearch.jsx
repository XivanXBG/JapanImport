import "./formSearch.css";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateSearchCriteria } from "../../reducer/actions";
import { useNavigate } from "react-router-dom";
import { loadCars } from "../../services/carsService";
import { toast } from "react-toastify";
import { toastStyles } from "../toastStyle";

const SearchFormKeys = {
  Make: "make",
    Model: "model",
    MinPrice: "minPrice",
    MaxPrice: "maxPrice",
    MinYear: "minYear",
    MaxYear: "maxYear",
    
};

const FormSearch = ({ dispatch }) => {
  const navigate = useNavigate();
  const submitHandler = () => {
    try {
      toast.dismiss();
  
      if (!isMaxPriceUnderOneMillion(values.maxPrice)) {
        
        return;
      }
      if(!isMaxYearCurrentYear(values.maxYear)){
        return
      }
      if(!isMinYear(values.minYear)){
        return
      }
  
      // Continue with the rest of the logic
      dispatch(updateSearchCriteria(values));
      navigate("/cars");
    } catch (error) {
      // Handle other errors if needed
    }
  };
  const { values, onChange, onSubmit } = useForm(submitHandler, {
    [SearchFormKeys.Make]: "",
    [SearchFormKeys.Model]: "",
    [SearchFormKeys.MinPrice]: "",
    [SearchFormKeys.MaxPrice]: "",
    [SearchFormKeys.MaxYear]: "",
    [SearchFormKeys.MinYear]: "",
  });

  const [cars, setCars] = useState([]);

  useEffect(() => {
    loadCars().then((cars) => setCars(cars));
  }, []);

  const getModelsForCarId = (carId) => {
    const car = cars.find((car) => car.id === carId);
    return car ? car.models : null;
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <div className="row">
          <div className="input-container">
            <label className="label">Make:</label>
            <select
              name={SearchFormKeys.Make}
              onChange={onChange}
              value={values[SearchFormKeys.Make]}
              className="select"
            >
              <option value="">Select make</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.id}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <label className="label">Price:</label>
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

        <div className="row">
          <div className="input-container">
            <label className="label">Model:</label>
            <select
              name={SearchFormKeys.Model}
              onChange={onChange}
              className="select"
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
          <div className="input-container">
            <label className="label">Year:</label>
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

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </>
  );
};
const mapStateToProps = (state) => ({
  searchCriteria: state,
});

export default connect(mapStateToProps)(FormSearch);
function isMaxPriceUnderOneMillion(maxPrice) {
  if(maxPrice==""){
    return true
  }
  if (maxPrice < 1000000) {
    return true;
  } else {
    // Throw a toast error if maxPrice is not under 1000000
    toast.error("Maximum price must be under 1000000", toastStyles);
    return false;
  }
}
function isMaxYearCurrentYear(maxYear) {
  if(maxYear==""){
    return true
  }
  if (maxYear <= 2023) {
    return true;
  } else {
    // Throw a toast error if maxPrice is not under 1000000
    toast.error("Maximum year must be under 2024", toastStyles);
    return false;
  }
}
function isMinYear(minYear) {
  if(minYear==""){
    return true
  }
  if (minYear >= 1980) {
    return true;
  } else {
    // Throw a toast error if maxPrice is not under 1000000
    toast.error("Minimun year must be over 1980", toastStyles);
    return false;
  }
}