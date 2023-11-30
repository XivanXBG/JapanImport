import React from "react";
import useForm from "../../hooks/useForm";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
const LoginPage = () => {
  const SearchFormKeys = {
    UsernameOrEmail: "usernameOrEmail",
    Password: "password",
  };
  const { loginHandler } = useContext(AuthContext);

  const { values, onChange, onSubmit } = useForm(loginHandler, {
    [SearchFormKeys.UsernameOrEmail]: "",
    [SearchFormKeys.Password]: "",
  });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.japanImportTheme}>
          <form onSubmit={onSubmit}>
            <label htmlFor="usernameOrEmail">Username:</label>
            <input
              className={styles.inputs}
              type="usernameOrEmail"
              id="usernameOrEmail"
              name={SearchFormKeys.UsernameOrEmail}
              value={values[SearchFormKeys.UsernameOrEmail]}
              onChange={onChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              className={styles.inputs}
              type="password"
              id="password"
              name={SearchFormKeys.Password}
              value={values[SearchFormKeys.Password]}
              onChange={onChange}
              required
            />

            <div className={styles.button}>
              <button className={styles.submitBtn} type="submit">
                Login
              </button>
              <p>
                You don't have an account:
                <Link className={styles.loginText} to="/register">
                  Register
                </Link>
              </p>
            </div>
          </form>

          <div className={styles.loginItems}>
            <img src="/images/google.png" alt="" />
            <img src="/images/facebook.png" alt="" />
            <img src="/images/github.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;