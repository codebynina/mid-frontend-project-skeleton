import { useEffect, useState } from "react";
import api from "../../api.js";
import EventCard from "./EventCard";

// TODO: split each event below into its own EventCard component
// TODO: add a "Buy ticket" button to each event card
// TODO: replace the mock data import with a fetch call to GET /events

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          api(`/events?search=${search}&page=${page}`),
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    console.log("EVENTS API URL:", api("/events"));
    fetchEvents();
  }, [search, page]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul className="event-list">
        {!loading &&
          !error &&
          events.map((event) => <EventCard key={event.id} event={event} />)}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
