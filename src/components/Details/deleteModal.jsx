import React from "react";
import styles from '../OrderDetail/orderDetails.module.css'
const DeleteModal = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          backgroundColor: "white",
          zIndex: 1,
        }}
      >
        <p style={{fontSize:"20px",display:'flex',justifyContent:'center'}}>Are you sure you want to delete?</p>
        <div style={{fontSize:"20px",display:'flex',justifyContent:'space-around'}}>
        <button className={styles.btn} style={{backgroundColor: 'rgba(0, 0, 0, 0.8)',color:"white",width:'100px',height:'30px'}} onClick={onConfirm}>Yes</button>
        <button className={styles.btn} style={{backgroundColor: 'rgba(0, 0, 0, 0.8)',color:"white",width:'100px',height:'30px'}} onClick={onCancel}>No</button>
        </div>
        
      </div>
    </div>
  );
};

export default DeleteModal;
