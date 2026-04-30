// TODO: display at least date, time, venue, city, and description for one event
// TODO: use useParams() to get the event id from the URL
// TODO: fetch the event from GET /events/:id instead of using mock data

import events from "../../data/events.js";
import { useEffect, useState } from "rect";
import { useParams } from "react-router-dom";
import api from "../../api.js";

export default function EventDetail() {
  const { id } = useParams(); // just show one event for now

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(api(`/events/${id}`));
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);
  if (loading) return <p>Loading event...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p> No event found </p>;

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
