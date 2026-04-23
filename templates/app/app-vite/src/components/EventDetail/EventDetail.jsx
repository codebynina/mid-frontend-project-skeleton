// TODO: display at least date, time, venue, city, and description for one event
// TODO: use useParams() to get the event id from the URL
// TODO: fetch the event from GET /events/:id instead of using mock data

import events from "../../data/events.js";

export default function EventDetail() {
  const event = events[0]; // just show one event for now

  return (
    <div style={{ padding: "20px" }}>
      <h1>{event.name}</h1>

      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Venue: {event.venue}</p>
      <p>City: {event.city}</p>

      <p>{event.description}</p>
    </div>
  );
}