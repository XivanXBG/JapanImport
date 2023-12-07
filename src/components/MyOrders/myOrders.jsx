import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getOrdersByOwnerId } from "../../services/carsService"; // Replace with your orders service
import styles from "./myOrders.module.css"; // Add your CSS module for styling

const MyOrders = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Assuming you have a service to retrieve orders by ownerId
    getOrdersByOwnerId(userId)
      .then((orders) => setOrders(orders))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [userId]);

  const getDeliveryTime = (location) => {
    if (location.toUpperCase().includes("AIR")) {
      return "Estimated Delivery Time: 10 days";
    } else if (location.toUpperCase().includes("PORT")) {
      return "Estimated Delivery Time: 30 days";
    } else {
      return "Delivery time information not available";
    }
  };

  return (
    <div className={styles.myOrders}>
      {orders.length > 0 ? (
        <div >
          <h1 className={styles.heading}>My Orders</h1>
          <div className={styles.cardContainer}>
          {orders.map((order) => (
            <div onClick={()=>navigate(`/orders/${order.id}`)} key={order.id} className={styles.orderCard}>
              <h3>Order ID: {order.id}</h3>
              {/* Display other order details as needed */}
              <p className={styles.location}>Location: {order.location}</p>
              <p>{getDeliveryTime(order.location)}</p>
            </div>
          ))}
          </div>
          
        </div>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default MyOrders;
