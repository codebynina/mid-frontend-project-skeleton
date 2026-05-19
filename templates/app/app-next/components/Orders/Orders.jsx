"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

export default function Orders() {
  const { user, token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(api("/orders"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Could not load orders.");
        }

        const data = await response.json();

        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user, token]);

  if (!user) {
    return (
      <section className="page-shell">
        <div className="panel-card">
          <h1>Orders</h1>

          <p className="panel-text">
            You must be logged in to view your orders.
          </p>

          <Link className="primary-link" href="/login">
            Go to login
          </Link>
        </div>
      </section>
    );
  }

  if (loading) return <p>Loading orders...</p>;

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <section className="page-shell">
        <div className="panel-card">
          <h1>No Orders Yet</h1>

          <p className="panel-text">
            Start exploring events and purchase your first ticket.
          </p>

          <Link className="primary-link" href="/events">
            Browse events
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="orders-header">
        <h1>My Tickets</h1>

        <p className="panel-text">View your purchased event tickets.</p>
      </div>

      <div className="tickets-grid">
        {orders.map((order) => (
          <div key={order.id} className="ticket-card">
            <div className="ticket-top">
              <span className="ticket-label">ORDER #{order.id}</span>

              <span className="ticket-price">€{order.total}</span>
            </div>

            <h2>Tech Event Ticket</h2>

            <p>{order.items.length} event ticket(s)</p>

            <div className="ticket-divider"></div>

            <Link href={`/orders/${order.id}`}>
              <button className="primary-button">View Ticket</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
