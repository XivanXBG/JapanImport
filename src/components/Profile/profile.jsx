import React from "react";
import {
  getCurrentUserInfo,
  updateAuthProfilePicture,
} from "../../services/authService";
import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({});


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getCurrentUserInfo();
        setUserData(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];

    const url = await updateAuthProfilePicture(file);
    console.log(url);
    setUserData((state)=>{
      return {
        ...state,
        photoURL: url,
      };
    })
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.userProfileContainer}>
        <div className={styles.profilePicture}>
          <label htmlFor="profilePictureInput">
            <img
              src={userData?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="Profile"
              style={{ cursor: "pointer" }}
            />
          </label>
          <p>click to change</p>
          {/* Hidden file input for selecting a new profile picture */}
          <input
            id="profilePictureInput"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ display: "none" }}
          />
        </div>
        <div className={styles.userDetails}>
          <div className={styles.details}>
            <label htmlFor="">Username:</label>
            <h2>{userData?.displayName}</h2>
          </div>
          <div className={styles.details}>
            <label htmlFor="">Email:</label>
            <h2>{userData?.email}</h2>
          </div>
        </div>
        <div className={styles.activeButtons}>
          <Link to={`${userData?.uid}/my-orders`}>
            <button className={styles.orders}>My Orders</button>
          </Link>
          <Link to={`${userData?.uid}/my-offers`}>
            <button className={styles.offers}>My Offers</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
