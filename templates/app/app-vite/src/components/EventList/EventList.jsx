import { useEffect, useState } from "react";
import api from "../../api.js";
import EventCard from "./EventCard";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");

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
        let sortedEvents = [...data];

        if (sortBy === "price-low-high") {
          sortedEvents.sort((a, b) => a.price - b.price);
        }

        if (sortBy === "price-high-low") {
          sortedEvents.sort((a, b) => b.price - a.price);
        }

        setEvents(sortedEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [search, page, sortBy]);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="default">Sort by</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && events.length === 0 && <p>No events found.</p>}

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
