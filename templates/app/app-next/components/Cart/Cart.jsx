"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <section className="page-shell">
        <div className="panel-card empty-cart-card">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your cart is empty</h1>

          <p className="panel-text">
            Start exploring tech conferences, workshops, and hackathons.
          </p>

          <Link className="primary-link" href="/events">
            Browse Events
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="panel-card">
        <div className="panel-header">
          <h1>Your cart</h1>
          <span className="cart-total-pill">€{total}</span>
        </div>

        <div className="cart-list">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <h2>{item.name}</h2>
                <p className="panel-text">€{item.price} per ticket</p>
              </div>

              <div className="cart-controls">
                <input
                  className="quantity-input"
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                />

                <button
                  className="secondary-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-row">
          <div>
            <p className="panel-text">Total amount</p>
            <h2>€{total}</h2>
          </div>

          <Link href="/checkout">
            <button className="primary-button">Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
