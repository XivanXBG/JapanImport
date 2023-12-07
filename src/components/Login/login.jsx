import React from "react";
import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { parseFirebaseError } from "../../utils/parseFirebaseErrors";
import "react-toastify/dist/ReactToastify.css";
import { toastStyles } from "../toastStyle";
import AuthContext from "../../contexts/authContext";

const LoginPage = () => {
  const SearchFormKeys = {
    UsernameOrEmail: "usernameOrEmail",
    Password: "password",
  };

  const { loginHandler, googleHandler, githubHandler, yahooHandler } =
    useContext(AuthContext);
  const handleLogin = async (values) => {
    toast.dismiss();
    try {
      const response = await loginHandler(values);
      console.log(response);
      // Clear all toasts on successful form submission
      toast.dismiss();
    } catch (error) {
      toast.error(parseFirebaseError(error.code),toastStyles)
      console.log('asd');
    }
  };

  const yahooLogin = async () => {
    try {
      const response = await yahooHandler();
      console.log(response);
      // Clear all toasts on successful form submission
      toast.dismiss();
    } catch (error) {
      toast.error(parseFirebaseError(error.code),toastStyles)
    }
  };
  const googleLogin = async () => {
    try {
      const response = await googleHandler();
      console.log(response);
      // Clear all toasts on successful form submission
      toast.dismiss();
    } catch (error) {
      toast.error(parseFirebaseError(error.code),toastStyles)
    }
  };
  const githubLogin = async (values) => {
    try {
      const response = await githubHandler();
      console.log(response);
      // Clear all toasts on successful form submission
      toast.dismiss();
    } catch (error) {
      toast.error(parseFirebaseError(error.code),toastStyles)
    }
  };
  const { values, onChange, onSubmit } = useForm(handleLogin, {
    [SearchFormKeys.UsernameOrEmail]: "",
    [SearchFormKeys.Password]: "",
  });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.japanImportTheme}>
          <form onSubmit={onSubmit}>
            <label className={styles.label} htmlFor="usernameOrEmail">
              Username:
            </label>
            <input
              className={styles.inputs}
              type="usernameOrEmail"
              id="usernameOrEmail"
              name={SearchFormKeys.UsernameOrEmail}
              value={values[SearchFormKeys.UsernameOrEmail]}
              onChange={onChange}
              required
            />

            <label className={styles.label} htmlFor="password">
              Password:
            </label>
            <input
              className={styles.inputs}
              type="password"
              id="password"
              name={SearchFormKeys.Password}
              value={values[SearchFormKeys.Password]}
              onChange={onChange}
              required
            />
            <p className={styles.forgot}>
              Forgot password?:{" "}
              <Link className={styles.Link} to={"/reset-password"}>
                Reset
              </Link>
            </p>
            <div className={styles.button}>
              <button className={styles.submitBtn} type="submit">
                Login
              </button>
              <p className={styles.redirect}>
                You don't have an account:
                <Link className={styles.loginText} to="/register">
                  Register
                </Link>
              </p>
            </div>
          </form>

          <div className={styles.loginItems}>
            <img onClick={googleLogin} src="/images/google.png" alt="" />
            <img onClick={yahooLogin} src="/images/yahoo.png" alt="" />
            <img onClick={githubLogin} src="/images/github.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
