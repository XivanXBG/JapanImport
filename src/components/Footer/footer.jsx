import React from "react";

const Footer = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "20px",
  textAlign: "center",
  height:"20px",
  margin:'0px'
};



const FooterContent = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const FooterComponent = () => {
  return (
    <footer style={Footer}>
      <div style={FooterContent}>
        <p style={{margin:'0px'}}>&copy; 2023 Japan Import</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
