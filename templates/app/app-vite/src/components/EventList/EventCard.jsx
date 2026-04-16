import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const soldOut = event.ticketsAvailable === 0;

  return (
    <li className="event-card">
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

      <p className={`event-card__tickets ${soldOut ? "sold-out" : ""}`}>
        {soldOut ? "Sold out" : `${event.ticketsAvailable} tickets left`}
      </p>

      <div className="event-card__actions">
        <Link to={`/events/${event.id}`} className="details-link">
          View Details
        </Link>

        <button className="buy-button" disabled={soldOut}>
          {soldOut ? "Sold Out" : "Buy Ticket"}
        </button>
      </div>
    </li>
  );
}