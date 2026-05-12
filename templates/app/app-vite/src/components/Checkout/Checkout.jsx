import { Link } from "react-router-dom";
import api from "../../api.js";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function Checkout() {
  const { user, token } = useAuth();
  const { items, total, clearCart } = useCart();

  async function handleCheckout() {
    try {
      const response = await fetch(api("/orders"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          total,
        }),
      });
      if (!response.ok) {
        throw new Error("Could not create order.");
      }

      clearCart();
      alert("Order created successfully.");
    } catch (err) {
      alert(err.message);
    }
  }
  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Checkout</h1>
        <p>You must be logged in to checkout.</p>
        <Link to="/login">Go to login</Link>
      </div>
    );
  }
  if (items.lenght === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/events">Browse events</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>
      <p>Total: €{total}</p>
      <button onClick={handleCheckout} Place order></button>
    </div>
  );
}
