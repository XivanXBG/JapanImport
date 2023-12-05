import React from "react";
import useForm from "../../hooks/useForm";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../contexts/authContext";
const RegisterPage = () => {
  const SearchFormKeys = {
    Username: "username",
    Password: "password",
    Email: "email",
    rePassword: "rePassword",
  };
  const { registerHandler,googleHandler,githubHandler,yahooHandler } = useContext(AuthContext);
  
  const { values, onChange, onSubmit } = useForm(registerHandler, {
    [SearchFormKeys.Username]: "",
    [SearchFormKeys.Password]: "",
    [SearchFormKeys.Email]: "",
    [SearchFormKeys.rePassword]: "",
  });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.japanImportTheme}>
          <form onSubmit={onSubmit}>
            <label className={styles.label} htmlFor="username">Username:</label>
            <input
              className={styles.inputs}
              type="username"
              id="username"
              name={SearchFormKeys.Username}
              value={values[SearchFormKeys.Username]}
              onChange={onChange}
              required
            />

            <label className={styles.label}  htmlFor="email">Email:</label>
            <input
              className={styles.inputs}
              type="email"
              id="email"
              name={SearchFormKeys.Email}
              value={values[SearchFormKeys.Email]}
              onChange={onChange}
              required
            />

            <label className={styles.label}  htmlFor="password">Password:</label>
            <input
              className={styles.inputs}
              type="password"
              id="password"
              name={SearchFormKeys.Password}
              value={values[SearchFormKeys.Password]}
              onChange={onChange}
              required
            />
            <label className={styles.label}  htmlFor="rePassword">Repeat Password:</label>
            <input
              className={styles.inputs}
              type="rePassword"
              id="rePassword"
              name={SearchFormKeys.rePassword}
              value={values[SearchFormKeys.rePassword]}
              onChange={onChange}
              required
            />
            <div className={styles.button}>
              <button className={styles.submitBtn} type="submit">
                Register
              </button>
              <p className={styles.redirect}>
                You already have an account:
                <Link className={styles.loginText} to="/login">
                  Login
                </Link>
              </p>
            </div>
          </form>

          <div className={styles.loginItems}>
            <img onClick={googleHandler} src="/images/google.png" alt="" />
            <img onClick={yahooHandler} src="/images/facebook.png" alt="" />
            <img onChange={githubHandler} src="/images/github.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
