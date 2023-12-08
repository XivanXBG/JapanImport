import { Link } from "react-router-dom";
import styles from "./header.module.css";
import useForm from "../../hooks/useForm";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import CartContext from "../../contexts/cartContext";
import CartItem from "./cartItem";
export default function Header() {
 

  const { isAuthenticated,user } = useContext(AuthContext);
  const { getCart } = useContext(CartContext);
  const [itemsInCart, setItemsInCart] = useState(false);
  const cart = getCart();
 
  useEffect(() => {
    if (cart.length > 0) {
      setItemsInCart(true);
    }else{
      setItemsInCart(false)
    }
  }, [cart]);
  return (
    <>
      <div className={styles.navigationWrapper}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Link to="/">
              <img src="/images/logo.svg" alt="" />
            </Link>
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

              <div
                style={{ top: "100%", left: "0" }}
                className={styles.dropdownContent}
              >
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

                    <Link className={styles.dropLink} to={`/profile/${user.uid}/my-offers`}>
                      My Offers
                    </Link>
                    <Link className={styles.dropLink} to={`/profile/${user.uid}/my-orders`}>
                      My Orders
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

            <div className={styles.dropdown}>
              <Link to="/checkout" className={`${styles.icon} ${styles.cartIcon}`}>
                <span className={styles.profileWrapper}>
                  <img src="/images/cart.svg" alt="" width="40" height="40" />
                </span>
              </Link>

              <div style={{ width: "auto" }} className={styles.dropdownContent}>
                {!isAuthenticated && (
                  <>
                    <Link className={styles.dropLinkCart}>
                      You must login in!
                    </Link>
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
                    {!itemsInCart && (
                      <div style={{width:'260px'}}>
                        <h3 style={{color:'black',padding:'5px'}}>Nothing added to cart yet...</h3>
                      </div>
                    )}
                    {itemsInCart && (
                      <>          
                        <div
                          style={{ maxHeight: "350px", overflowY: "scroll" }}
                        >
                          {cart?.map((offer) => (
                            <CartItem offer={offer} key={offer.id} />
                          ))}
                        </div>
                        <div>
                          <Link className={styles.checkout} to="/checkout">
                            Checkout
                          </Link>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
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
