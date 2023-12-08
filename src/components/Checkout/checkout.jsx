import React, { useState, useContext } from "react";
import { addNewOrder } from "../../services/ordersService";
import CartContext from "../../contexts/cartContext";
import styles from "./checkout.module.css"; // Import your CSS module
import AuthContext from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastStyles } from "../toastStyle";
const CheckoutPage = () => {
  const { getCart, removeFromCart,resetCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });
  const cart = getCart();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const calculateTotalPrice = () => {
    if (formData?.location === '') {
        return 'Select shipping location first to see!';
    } else {
        // Use template literals to include text and total in the string
        const total = cart.reduce((acc, item) => {
            const isAirLocation = formData?.location && formData?.location.toUpperCase().includes('AIR');
            const travelCost = isAirLocation ? 10000 : 5000;
            return acc + Number(item.price) + travelCost;
        }, 0);

        return `$${total}`;
    }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const idsArray = cart.map((item) => item.id).filter(Boolean);
    const price = calculateTotalPrice();
    const data = {
      car_ids: idsArray,
      ownerId: user?.uid,
      ...formData,
      price,
    };
    if (cart.length <= 0) {
      toast.error("Cart is empty!", toastStyles);
      return;
    }
    addNewOrder(data);
    resetCart()
    navigate("/successfull");
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.cartContainer}>
        <h2>Your Cart</h2>
        {cart.length <= 0 && <h3 style={{ color: "black" }}>Cart is empty!</h3>}
        {cart.length > 0 && (
          <>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex" }}>
                <div
                  onClick={() => navigate(`/cars/${item.id}`)}
                  className={styles.cartItem}
                >
                  <img src={item.photos[0]} alt={item.make} />
                  <div>
                    <p className={styles.itemName}>
                      {item.make} {item.model}
                    </p>
                    <p className={styles.itemPrice}>${item.price}</p>
                  </div>
                </div>
                <div
                  onClick={() => removeFromCart(item)}
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  &#10006; {/* "X" character */}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className={styles.checkoutFormContainer}>
        <h2>Checkout Information</h2>
        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.label}>
              Location:
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={styles.select}
              required
            >
              <option disabled value="">
                Select desired location
              </option>
              <option value="sofiaAIR">Sofia airport</option>
              <option value="burgasPORT">Burgas port</option>
              <option value="burgasAIR">Burgas airport</option>
              <option value="varnaPORT">Varna port</option>
              <option value="varnaAIR">Varna airport</option>
              <option value="rusePORT">Ruse port</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className={styles.totalPrice}>
            <p className={styles.totalLabel}>Total Price:</p>
            <p className={styles.totalAmount}>{calculateTotalPrice()}</p>
          </div>
          <button type="submit" className={styles.submitButton}>
            Finish Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
