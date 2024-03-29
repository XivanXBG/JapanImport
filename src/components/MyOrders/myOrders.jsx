import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getOrdersByOwnerId } from "../../services/ordersService";
import styles from "./myOrders.module.css";

const MyOrders = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrdersByOwnerId(userId)
      .then((orders) => {
       
        if(orders === undefined){
          setOrders([]);
        }else{
          setOrders(orders)
        }
      })
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
             
              <p className={styles.location}>Location: {order.location}</p>
              <p>{getDeliveryTime(order.location)}</p>
            </div>
          ))}
          </div>
          
        </div>
      ) : (
        <h1>No orders available.</h1>
      )}
    </div>
  );
};

export default MyOrders;
