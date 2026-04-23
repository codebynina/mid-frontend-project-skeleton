import { useState } from "react";

export default function EventDetail({ event }) {
  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return <p className="empty-state">Select an event to see details.</p>;
  }

  const isSoldOut = event.ticketsAvailable === 0;

  return (
    <section className="detail-card">
      <h2>{event.name}</h2>
      <p>
        <span role="img" aria-label="date and time">
          📅
        </span>{" "}
        {event.date} at {event.time}
      </p>
      <p>
        <span role="img" aria-label="location">
          📍
        </span>{" "}
        {event.venue}, {event.city}
      </p>
      <p>{event.description}</p>
      <p className="event-price">
        {event.price === 0 ? "Free" : `€${event.price}`}
      </p>
      <p className={isSoldOut ? "tickets sold-out" : "tickets available"}>
        {isSoldOut ? "Sold out" : `${event.ticketsAvailable} tickets left`}
      </p>

      {!isSoldOut && (
        <div className="event-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="btn btn-secondary"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= event.ticketsAvailable}
          >
            +
          </button>
        </div>
      )}
    </section>
  );
}
