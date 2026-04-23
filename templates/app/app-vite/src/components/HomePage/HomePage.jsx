import { useState } from "react";
import events from "../../data/events.js";
import EventList from "../EventList/EventList.jsx";
import EventDetail from "../EventDetail/EventDetail.jsx";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedEvent, setSelectedEvent] = useState(events[0]);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "price-low-high") {
      return a.price - b.price;
    }

    if (sortBy === "price-high-low") {
      return b.price - a.price;
    }

    if (sortBy === "tickets-low-high") {
      return a.ticketsAvailable - b.ticketsAvailable;
    }

    if (sortBy === "tickets-high-low") {
      return b.ticketsAvailable - a.ticketsAvailable;
    }

    return 0;
  });

  return (
    <div className="home-page">
      <section className="hero-card">
        <h1>Upcoming Events</h1>
        <p>Browse conferences, workshops, and hackathons happening soon.</p>
      </section>

      <div className="controls-row">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="default">Sort by</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="tickets-low-high">Tickets: Low to High</option>
          <option value="tickets-high-low">Tickets: High to Low</option>
        </select>
      </div>

      {sortedEvents.length === 0 ? (
        <p className="empty-state">No events found.</p>
      ) : (
        <EventList events={sortedEvents} onSelectEvent={setSelectedEvent} />
      )}

      <EventDetail event={selectedEvent} />
    </div>
  );
}
export default HomePage;
