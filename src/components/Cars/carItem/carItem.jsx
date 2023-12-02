import styles from "./carItem.module.css";

export default function CarItem({ car }) {
  console.log(car);
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img className={styles.img} src={car.photos[0]} alt="car" />
      </div>
      <div className={styles.moreInfo}>
        <h3 className={styles.name}>
          {car.make} {car.model}
        </h3>
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
