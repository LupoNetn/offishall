"use client";
import React, { createContext, useState } from "react";

export const CartContext = createContext();
const CartContextProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = cartItems.reduce((total,item) => total + item.price * item.quantity,0)

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== itemId)
    );
  }
  return (
    <>
      <CartContext.Provider value={{ showCart, toggleCart,addToCart,cartItems,removeFromCart,totalQuantity,totalPrice }}>
        {children}
      </CartContext.Provider>
    </>
  );
};

export default CartContextProvider;
