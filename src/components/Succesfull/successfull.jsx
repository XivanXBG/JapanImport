import React from "react";
import { Link } from "react-router-dom";
import styles from "./successfull.module.css" // Create a CSS module for styling

const Successfull = () => {
  console.log('assucc');
  return (
    <div className={styles.container}>
      <h1>Succesful order</h1>
      <img src="/images/sad.png" alt="Car" className={styles.carImage} />
      <p>Soon, await your order at the desired location!</p>
      <p>Meanwhile you can search for more cars:</p>
      <div style={{display:'flex',gap:'30px',justifyContent:'center'}}>
        <Link to="/" className={styles.redirectButton}>
          Back to Home
        </Link>
        <Link to="/my-orders" className={styles.redirectButton}>
          My Orders
        </Link>
      </div>
    </div>
  );
};

export default Successfull;
