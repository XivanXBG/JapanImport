import { createContext } from "react";

import { useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  

  const [cart, setCart] = useState([]);

  useEffect(() => {}, []);

  const addToCart = (order) => {
    setCart((state) => {
      const updatedCart = [...state];


      if (!updatedCart.some((cartItem) => cartItem.id === order.id)) {
        updatedCart.push(order);
      }

      return updatedCart;
    });
  };
  const removeFromCart = (order) => {
    setCart((state) => state.filter((x) => x.id !== order.id));
  };
  const resetCart = () => {
    setCart([]);
  };

  const getCart = () => {
    return cart;
  };
  const contextValues = {
    addToCart,
    removeFromCart,
    getCart,
    resetCart
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

CartContext.displayName = "CartContext";

export default CartContext;
