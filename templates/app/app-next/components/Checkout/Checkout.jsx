"use client";

import Link from "next/link";
import { useState } from "react";

import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const { user, token } = useAuth();
  const { items, total, clearCart } = useCart();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(api("/orders"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          items,
          total,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Checkout failed:", response.status, errorText);
        throw new Error("Could not create order.");
      }

      clearCart();
      setSuccess("Your order was placed successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <section className="page-shell">
        <div className="panel-card">
          <h1>Checkout</h1>

          <p className="panel-text">You must be logged in to checkout.</p>

          <Link className="primary-link" href="/login">
            Go to login
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0 && !success) {
    return (
      <section className="page-shell">
        <div className="panel-card">
          <h1>Checkout</h1>

          <p className="panel-text">Your cart is empty.</p>

          <Link className="primary-link" href="/events">
            Browse events
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="panel-card">
        <h1>Checkout</h1>

        <p className="panel-text">Review your order before placing it.</p>

        <div className="checkout-summary">
          {items.map((item) => (
            <div key={item.id} className="checkout-item">
              <span>{item.name}</span>

              <span>
                {item.quantity} × €{item.price}
              </span>
            </div>
          ))}
        </div>

        <div className="checkout-row">
          <h2>Total</h2>
          <h2>€{total}</h2>
        </div>

        {error && <p className="error-message">{error}</p>}

        {success && (
          <div className="success-box">
            <h3>Success</h3>

            <p>{success}</p>

            <Link href="/orders">
              <button className="primary-button">View Orders</button>
            </Link>
          </div>
        )}

        {!success && (
          <button
            className="primary-button"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        )}
      </div>
    </section>
  );
}
