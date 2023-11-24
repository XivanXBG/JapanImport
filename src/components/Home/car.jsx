import { loadCarFullInfo } from "../../carsDB/carsDb";
import "./car.css";
export default function Car({ text, imageSource }) {

    return Object.entries(loadCarFullInfo()).map(kvp => (

        <div key={kvp[0]} className="card">
            <img src={kvp[1].image} alt="A car" className="card-img" />
        </div>
    ))

}