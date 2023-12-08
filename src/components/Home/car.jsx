import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { updateSearchCriteria } from "../../reducer/actions";
import { loadCars } from "../../services/offersService";
import "./car.css";

const Car = ({customDispatch}) => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    loadCars().then((x) => setCars(x));
  }, []);
const navigate = useNavigate()
  const handleSearch = (make) => {
    
    customDispatch(updateSearchCriteria({ make: make }));
    navigate("/cars");
  };
  return cars.map((car) => (
    <div onClick={() => handleSearch(car.id)} key={car.id} className="card">
      <img src={car.image} alt="A car" className="card-img" />
      <span>{car.id}</span>
    </div>
  ));
};
const mapDispatchToProps = (dispatch) => ({
  customDispatch: dispatch,
});

export default connect(null, mapDispatchToProps)(Car);
