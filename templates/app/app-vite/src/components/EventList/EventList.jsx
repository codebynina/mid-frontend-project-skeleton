import EventCard from "../EventCard/EventCard.jsx";

export default function EventList({ events, onSelectEvent }) {
  if (!events || events.length === 0) {
    return <p className="empty-state">No events available.</p>;
  }

  return (
    <ul className="event-list">
      <ul className="event-list">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onSelectEvent={onSelectEvent}
          />
        ))}
      </ul>
    </ul>
  );
}
