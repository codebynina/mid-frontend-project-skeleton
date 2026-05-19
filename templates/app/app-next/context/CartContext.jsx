"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  function saveCart(nextItems) {
    setItems(nextItems);

    localStorage.setItem("cart", JSON.stringify(nextItems));
  }

  function addToCart(event) {
    const existing = items.find((item) => item.id === event.id);

    if (existing) {
      const updated = items.map((item) =>
        item.id === event.id ? { ...item, quantity: item.quantity + 1 } : item,
      );

      saveCart(updated);
    } else {
      saveCart([
        ...items,
        {
          ...event,
          quantity: 1,
        },
      ]);
    }
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) return;

    const updated = items.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );

    saveCart(updated);
  }

  function removeFromCart(id) {
    saveCart(items.filter((item) => item.id !== id));
  }

  function clearCart() {
    saveCart([]);
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
