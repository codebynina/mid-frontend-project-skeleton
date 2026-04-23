export default function EventCard({ event, onSelectEvent }) {
  const isSoldOut = event.ticketsAvailable === 0;
  const isFree = event.price === 0;

  return (
    <li className="event-card">
      <div className="event-content">
        <div className="event-card-top">
          <span className="event-tag">{event.category}</span>
          <span className="event-price">
            {isFree ? "Free" : `€${event.price}`}
          </span>
        </div>

        <h2 className="event-title">{event.name}</h2>

        <p className="event-meta">
          📅 {event.date} at {event.time}
        </p>

        <p className="event-meta">
          📍 {event.venue}, {event.city}
        </p>

        <p className={isSoldOut ? "tickets sold-out" : "tickets available"}>
          {isSoldOut ? "Sold out" : `${event.ticketsAvailable} tickets left`}
        </p>
      </div>

      {/* Buttons now separate */}
      <div className="event-actions">
        <button
          className="btn btn-secondary"
          onClick={() => onSelectEvent(event)}
        >
          View Details
        </button>

        <button className="btn btn-primary" disabled={isSoldOut}>
          {isSoldOut ? "Sold Out" : "Buy Ticket"}
        </button>
      </div>
    </li>
  );
}
