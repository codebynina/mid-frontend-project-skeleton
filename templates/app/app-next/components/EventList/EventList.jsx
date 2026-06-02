"use client";

import { useEffect, useState } from "react";

import api from "@/utils/api";

import EventCard from "./EventCard";

const EVENTS_PER_PAGE = 6;

export default function EventList() {
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");

  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(api("/events"));

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        setAllEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    let filteredEvents = allEvents.filter((event) => {
      const matchesSearch = event.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = category === "All" || event.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-low-high") {
      filteredEvents.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high-low") {
      filteredEvents.sort((a, b) => b.price - a.price);
    }

    const startIndex = (page - 1) * EVENTS_PER_PAGE;

    const endIndex = startIndex + EVENTS_PER_PAGE;

    setEvents(filteredEvents.slice(startIndex, endIndex));
  }, [allEvents, search, page, sortBy, category]);

  const totalPages = Math.ceil(
    allEvents.filter((event) => {
      const matchesSearch = event.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = category === "All" || event.category === category;

      return matchesSearch && matchesCategory;
    }).length / EVENTS_PER_PAGE,
  );

  return (
    <div className="events-page">
      <div className="category-filters">
        {[
          "All",
          "Conference",
          "Workshop",
          "Meetup",
          "Hackathon",
          "Bootcamp",
        ].map((item) => (
          <button
            key={item}
            className={`filter-chip ${category === item ? "active" : ""}`}
            onClick={() => {
              setPage(1);
              setCategory(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="events-toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => {
            setPage(1);
            setSortBy(e.target.value);
          }}
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
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={setSelectedEvent}
            />
          ))}
      </ul>

      {!loading && !error && totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {selectedEvent && (
        <div className="modal-backdrop">
          <div className="event-modal">
            <button
              className="modal-close"
              onClick={() => setSelectedEvent(null)}
            >
              ×
            </button>

            <img
              src={selectedEvent.image}
              alt={selectedEvent.name}
              className="event-card__image"
            />

            <span className="event-card__category">
              {selectedEvent.category}
            </span>

            <h2>{selectedEvent.name}</h2>

            <p>
              <strong>Date:</strong> {selectedEvent.date} at{" "}
              {selectedEvent.time}
            </p>

            <p>
              <strong>Location:</strong> {selectedEvent.venue},{" "}
              {selectedEvent.city}
            </p>

            <p>{selectedEvent.description}</p>

            <p>
              <strong>Price:</strong>{" "}
              {selectedEvent.price === 0 ? "Free" : `€${selectedEvent.price}`}
            </p>

            <p>
              <strong>Tickets:</strong>{" "}
              {selectedEvent.ticketsAvailable === 0
                ? "Sold out"
                : `${selectedEvent.ticketsAvailable} tickets left`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
