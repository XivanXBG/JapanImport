import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getOrderByIdWithOffers,
  deleteOrderById,
} from "../../services/ordersService";
import styles from "./orderDetails.module.css";
import DeleteModal from "../Details/deleteModal";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const [validOffers,setValidOffers] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    getOrderByIdWithOffers(orderId).then((x) => {
    if(x.offers.includes(undefined)){
      setValidOffers(false);
    }
      setOrder(x);
    });
  }, []);
  const navigate = useNavigate();
  const handleDeleteOrder = () => {
    // Show the confirm order cancel modal
    setShowConfirmModal(true);
  };

  const handleCancelDelete = () => {
    // Hide the confirm order cancel modal
    setShowConfirmModal(false);
  };
  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.cartContainer}>
        <h2>Your Cart</h2>
        {!validOffers && (
          <h1>
            There was a problem with your car! Please contact support for more
            info!
          </h1>
        )}
        {validOffers && (
          order?.offers.map((item) => (
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
            </div>
          ))
        )}
        
      </div>
      <div className={styles.checkoutFormContainer}>
        <h2>Delivery Information</h2>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="">
            Name:
          </label>
          <p> {order?.order.name}</p>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="">
            Phone:
          </label>
          <p> {order?.order.phone}</p>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="">
            Delivery:
          </label>
          <p className={styles.location}> {order?.order.location}</p>
        </div>
        <div className={styles.totalPrice}>
          <p className={styles.totalLabel}>Total Price:</p>
          <p className={styles.totalAmount}> {order?.order.price}</p>
        </div>
        <button
          onClick={handleDeleteOrder}
          type="submit"
          className={styles.submitButton}
        >
          Cancel Order
        </button>
        {showConfirmModal && (
          <DeleteModal
            isOpen={showConfirmModal}
            onCancel={handleCancelDelete}
            onConfirm={() => {
              deleteOrderById(order?.orderId);
              navigate("/profile");
            }}
          />
        )}
      </div>
    </div>
  );
}
