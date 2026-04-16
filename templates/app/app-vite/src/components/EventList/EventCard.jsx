import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <li>
      <h2>{event.name}</h2>

      <p>
        {event.date} at {event.time}
      </p>

      <p>
        {event.venue}, {event.city}
      </p>

      <p>{event.category}</p>

      <p>{event.price === 0 ? "Free" : `€${event.price}`}</p>

      <p>
        {event.ticketsAvailable === 0
          ? "Sold out"
          : `${event.ticketsAvailable} tickets left`}
      </p>

      {/* View details */}
      <Link to={`/events/${event.id}`}>
        <button>View Details</button>
      </Link>

      {/* Buy ticket */}
      <button disabled={event.ticketsAvailable === 0}>
        {event.ticketsAvailable === 0 ? "Sold Out" : "Buy Ticket"}
      </button>
    </li>
  );
}
