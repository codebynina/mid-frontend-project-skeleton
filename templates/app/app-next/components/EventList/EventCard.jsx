"use client";

import { useState } from "react";

import { useCart } from "@/context/CartContext";

export default function EventCard({ event, onViewDetails }) {
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);

  const soldOut = event.ticketsAvailable === 0;

  const lowTickets = event.ticketsAvailable > 0 && event.ticketsAvailable < 20;

  function handleAddToCart() {
    addToCart(event);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  }

  return (
    <li className="event-card">
      <div>
        <img src={event.image} alt={event.name} className="event-card__image" />

        <div className="event-card__top">
          <span className="event-card__category">{event.category}</span>

          <span className="event-card__price">
            {event.price === 0 ? "Free" : `€${event.price}`}
          </span>
        </div>

        <h2 className="event-card__title">{event.name}</h2>

        <p className="event-card__info">
          <strong>Date:</strong> {event.date} at {event.time}
        </p>

        <p className="event-card__info">
          <strong>Location:</strong> {event.venue}, {event.city}
        </p>

        <div className="badges-row">
          {soldOut && <span className="soldout-badge">Sold Out</span>}

          {lowTickets && <span className="hot-badge">Almost Sold Out</span>}
        </div>

        <p className={`event-card__tickets ${soldOut ? "sold-out" : ""}`}>
          {soldOut
            ? "No tickets available"
            : `${event.ticketsAvailable} tickets left`}
        </p>
      </div>

      <div>
        {added && <p className="cart-feedback">Added to cart</p>}

        <div className="event-card__actions">
          <button
            type="button"
            className="details-link"
            onClick={() => onViewDetails(event)}
          >
            View Details
          </button>

          <button
            className="buy-button"
            disabled={soldOut}
            onClick={handleAddToCart}
          >
            {soldOut ? "Sold Out" : "Buy Ticket"}
          </button>
        </div>
      </div>
    </li>
  );
}
