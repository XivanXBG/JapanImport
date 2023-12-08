import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../contexts/cartContext";

export default function CartItem({ offer }) {
  const navigate = useNavigate();

  const { removeFromCart } = useContext(CartContext);
  const mainContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    padding: "10px",
    width: "auto",
    cursor: "pointer",
  };
  const textStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100px",
  };
  const imageStyle = {
    width: "250px",
    height: "150px",
    marginRight: "10px",
    objectFit: "fill",
  };
  return (
    <>
      <div style={mainContainerStyle}>
        <div
          onClick={() => navigate(`/cars/${offer.id}`)}
          style={mainContainerStyle}
        >
          <img src={offer.photos[0]} alt="Product" style={imageStyle} />
          <div style={textStyle}>
            <div style={{ marginRight: "10px" }}>
              {offer.make} {offer.model}
            </div>

            <div style={{ marginRight: "10px", fontWeight: "bold" }}>
              ${offer.price}
            </div>
          </div>
        </div>

        <div
          onClick={() => removeFromCart(offer)}
          style={{ cursor: "pointer" }}
        >
          &#10006;
        </div>
      </div>
    </>
  );
}
