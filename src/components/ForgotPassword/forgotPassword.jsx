import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from '../../utils/firebase'
import React, { useState } from "react";
import styles from "./forgotPassword.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const containerStyle = {
    textAlign: "center",
    marginTop: "50px",
  };

  const buttonStyle = {
    cursor: "pointer",
    height: "40px",
    width: "120px",
  };

  const handleResendEmail = () => {
    sendPasswordResetEmail(auth,email)
      .then(() => {
      
        setEmailSent(true);
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error.message);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.verifyEmailContainer} style={containerStyle}>
        <h2 style={{ fontSize: "20px" }}>Password reset</h2>
        <p>
          To reset your password, please enter your email address below. We'll
          send you a link to reset your password.
        </p>
        {!emailSent && (
          <div>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button onClick={handleResendEmail} style={buttonStyle}>
              Send Reset Email
            </button>
          </div>
        )}
        {emailSent && (
          <p>
            If the email address is associated with an account, a password reset
            email has been sent.
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
