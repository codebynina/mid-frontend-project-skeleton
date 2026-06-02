"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

export default function OrderDetail({ id }) {
  const { user, token } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(api(`/orders/${id}`), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Could not load order.");
        }

        const data = await response.json();

        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchOrder();
    } else {
      setLoading(false);
    }
  }, [id, user, token]);

  if (!user) {
    return (
      <section className="page-shell">
        <div className="panel-card">
          <h1>Order Detail</h1>

          <p className="panel-text">You must be logged in.</p>

          <Link className="primary-link" href="/login">
            Login
          </Link>
        </div>
      </section>
    );
  }

  if (loading) return <p>Loading order...</p>;

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!order) return <p>Order not found.</p>;

  return (
    <section className="page-shell">
      <div className="ticket-detail-card">
        <div className="ticket-detail-header">
          <div>
            <span className="ticket-label">ORDER #{order.id}</span>

            <h1>Your Tickets</h1>
          </div>

          <div className="ticket-price">€{order.total}</div>
        </div>

        <div className="ticket-divider"></div>

        {order.items.map((item) => (
          <div key={item.id} className="ticket-item">
            <div>
              <h2>{item.name}</h2>

              <p>Quantity: {item.quantity}</p>
            </div>

            <div className="ticket-qr">QR</div>
          </div>
        ))}

        <div className="ticket-divider"></div>

        <Link href="/orders">
          <button className="primary-button">Back to Orders</button>
        </Link>
      </div>
    </section>
  );
}
