import styles from "./carItem.module.css";
import {useNavigate} from 'react-router-dom'
export default function CarItem({ car }) {
 const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`${car.id}`)} className={styles.card}>
      <div className={styles.image}>
        <img className={styles.img} src={car.photos[0]} alt="car" />
      </div>
      <div className={styles.moreInfo}>
        <div className={styles.wishlistHeader}>
          <h3 className={styles.name}>
            {car.make} {car.model}
          </h3>
          <i className="fa-regular fa-heart"></i>
        </div>

        <p className={styles.fAwesome}>
          <i className="fa-solid fa-location-dot"></i>
          <span> {car.loc}</span>
        </p>
        <h2 className={styles.price}>${car.price}</h2>

        <div className={styles.condensedInfo}>
          <div>
            <p>{car.year}</p>

            <p>{car.color}</p>
          </div>
          <hr />
          <div>
            <p>{car.engine}</p>
            <p>{car.killometers} km</p>
          </div>
        </div>
      </div>
    </div>
  );
}
