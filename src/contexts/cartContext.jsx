import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  

  const [cart, setCart] = useState([]);
  console.log(cart);
  useEffect(() => {}, []);

  const addToCart = (order) => {
    setCart((state) => {
      const updatedCart = [...state];

      // Check if the item is not already in the cart
      if (!updatedCart.some((cartItem) => cartItem.id === order.id)) {
        updatedCart.push(order);
      }

      return updatedCart;
    });
  };
  const removeFromCart = (order) => {
    setCart((state) => state.filter((x) => x.id !== order.id));
  };

  const getCart = () => {
    return cart;
  };
  const contextValues = {
    addToCart,
    removeFromCart,
    getCart,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

CartContext.displayName = "CartContext";

export default CartContext;
