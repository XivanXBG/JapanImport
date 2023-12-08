import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <img src='/images/sad.png' alt="Car" className={styles.carImage} />
      <p>Oops! It looks like you took a wrong turn.</p>
      <p>The page you are looking for might be in another garage.</p>
      <Link to="/" className={styles.redirectButton}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
