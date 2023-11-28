import { useEffect, useState } from "react";
import { loadCars } from "../../utils/firebase";
import "./car.css";

export default function Car() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    loadCars().then((x) => setCars(x));
  }, []);
  return cars.map((car) => (
    <div key={car.id} className="card">
      <img src={car.image} alt="A car" className="card-img" />
    </div>
  ));
}
