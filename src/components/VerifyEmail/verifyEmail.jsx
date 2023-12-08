import React from "react";
import { sendEmailVerification } from "firebase/auth";
import AuthContext from "../../contexts/authContext";
import { useContext } from "react";
import styles from "./VerifyEmail.module.css";

const VerifyEmail = () => {
  const { user } = useContext(AuthContext);

  const containerStyle = {
    textAlign: "center",
    marginTop: "50px",
    
  };

  const buttonStyle = {

    cursor: "pointer",

  };
 

  return (
    <div className={styles.wrapper} >
      <div className={styles.verifyEmailContainer} style={containerStyle}>
        <h2>Verify Your Email</h2>
        <p>
          An email has been sent to your registered email address. Please click
          the link in the email to verify your account.
        </p>
        <p onClick={() => sendEmailVerification(user)}>
          <button className={styles.resendLink} style={buttonStyle}>
            Didn't receive the email?
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
