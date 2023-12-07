import React from "react";
import useForm from "../../hooks/useForm";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { parseFirebaseError } from "../../utils/parseFirebaseErrors";
import { toast } from "react-toastify";
import { toastStyles } from "../toastStyle";
import AuthContext from "../../contexts/authContext";
const RegisterPage = () => {
  const SearchFormKeys = {
    Username: "username",
    Password: "password",
    Email: "email",
    rePassword: "rePassword",
  };
  const { registerHandler, googleHandler, githubHandler, yahooHandler } =
    useContext(AuthContext);
  

  const handlerRegister = async (values) => {
    toast.dismiss();
    const isPasswordMatch = validatePasswordMatch(values);
   
    if (!isPasswordMatch) {
      
      return; // Prevent form submission if passwords don't match
    }
    
    try {
      
      const response = await registerHandler(values);
      console.log(response);
      // Clear all toasts on successful form submission
      toast.dismiss();
    } catch (error) {
      toast.error(parseFirebaseError(error.code), toastStyles);
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
      toast.error(parseFirebaseError(error.code), toastStyles);
    }
  };
  const googleLogin = async () => {
    try {
      const response = await googleHandler();
      console.log(response);
      // Clear all toasts on successful form submission
      toast.dismiss();
    } catch (error) {
      toast.error(parseFirebaseError(error.code), toastStyles);
    }
  };
  const githubLogin = async (values) => {
    try {
      const response = await githubHandler();
      console.log(response);
      // Clear all toasts on successful form submission
      toast.dismiss();
    } catch (error) {
      toast.error(parseFirebaseError(error.code), toastStyles);
    }
  };
  const { values, onChange, onSubmit } = useForm(handlerRegister, {
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
            <label className={styles.label} htmlFor="username">
              Username:
            </label>
            <input
              className={styles.inputs}
              type="username"
              id="username"
              name={SearchFormKeys.Username}
              value={values[SearchFormKeys.Username]}
              onChange={onChange}
              required
            />

            <label className={styles.label} htmlFor="email">
              Email:
            </label>
            <input
              className={styles.inputs}
              type="email"
              id="email"
              name={SearchFormKeys.Email}
              value={values[SearchFormKeys.Email]}
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
            <label className={styles.label} htmlFor="rePassword">
              Repeat Password:
            </label>
            <input
              className={styles.inputs}
              type="password"
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
            <img onClick={googleLogin} src="/images/google.png" alt="" />
            <img onClick={yahooLogin} src="/images/yahoo.png" alt="" />
            <img onChange={githubLogin} src="/images/github.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
const validatePasswordMatch = (values) => {
  const { password, rePassword } = values;
  if (password !== rePassword) {
    // Use toast.error to display an error message
    toast.error("Passwords do not match", toastStyles);
   
    return false;
  }
 
  return true;
};