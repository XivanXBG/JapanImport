import { Link } from "react-router-dom";
import styles from "./header.module.css";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";


export default function Header() {
  const currencyOptions = [
    { value: "BGN", label: "BGN" },
    { value: "EUR", label: "EUR" },
  ];
  const searchHandler = (values) => {
    console.log(values);
  };

  const SearchFormKeys = {
    Text: "text",
  };

  const { onChange, values, onSubmit } = useForm(searchHandler, {
    [SearchFormKeys.Text]: "",
  });

  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);

  return (
    <>
      <div className={styles.navigationWrapper}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Link to="/">
              <img src="/images/logo.svg" alt="" />
            </Link>
          </div>
          <div className={styles.searchBar}>
            <form onSubmit={onSubmit} className={styles.formSearch} action="#">
              <input
                name={SearchFormKeys.Text}
                onChange={onChange}
                value={values[SearchFormKeys.Text]}
                type="text"
                placeholder="Search..."
              />
              <button className={styles.searchButton} type="submit">
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l6 5.99L20.49 19l-5.99-6zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </form>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.dropdown}>
              <Link
                to="/profile"
                className={`${styles.icon} ${styles.profileIcon}`}
              >
                <span className={styles.profileWrapper}>
                  <img src="/images/user.svg" alt="" width="40" height="40" />
                </span>
              </Link>

              <div className={styles.dropdownContent}>
                {!isAuthenticated && (
                  <>
                    <Link className={styles.dropLink} to="/login">
                      Login
                    </Link>
                    <Link className={styles.dropLink} to="/register">
                      Register
                    </Link>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    <Link className={styles.dropLink} to="/profile">
                      Profile
                    </Link>
                    <Link className={styles.dropLink} to="/my-orders">
                      Orders
                    </Link>
                    <Link className={styles.dropLink} to="/logout">
                      Logout
                    </Link>
                  </>
                )}
              </div>
            </div>

            <Link
              to="/wishlist"
              className={`${styles.icon} ${styles.wishlistIcon}`}
            >
              <img src="/images/wishlist.svg" alt="" width="40" height="40" />
            </Link>

            <Link to="/cart" className={`${styles.icon} ${styles.cartIcon}`}>
              <img src="/images/cart.svg" alt="" width="40" height="40" />
            </Link>
            <hr className={styles.line} />
            <select className={styles.currencySelector}>
              {currencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <nav className={styles.navigation}>
          <div className={styles.links}>
            <Link className={styles.link} to="/">
              Home
            </Link>
            <Link className={styles.link} to="/cars">
              Cars
            </Link>
            <Link className={styles.link} to="/reviews">
              Reviews
            </Link>
            {isAuthenticated && (
              <Link className={styles.link} to="/create">
                Create
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
