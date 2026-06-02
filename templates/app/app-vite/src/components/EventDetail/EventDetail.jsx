import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api.js";

export default function EventDetail() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(api(`/events/${id}`));

        if (!response.ok) {
          throw new Error("Failed to load event.");
        }

        const data = await response.json();
        setEvent(data);
        setQuantity(1);
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
  if (!event) return <p>Event not found.</p>;

  const isSoldOut = event.ticketsAvailable === 0;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{event.name}</h1>

      <p>
        <strong>Date:</strong> {event.date}
      </p>

      <p>
        <strong>Time:</strong> {event.time}
      </p>

      <p>
        <strong>Venue:</strong> {event.venue}
      </p>

      <p>
        <strong>City:</strong> {event.city}
      </p>

      <p>{event.description}</p>

      <p>
        <strong>Price:</strong> {event.price === 0 ? "Free" : `€${event.price}`}
      </p>

      <p>
        <strong>Tickets:</strong>{" "}
        {isSoldOut ? "Sold out" : `${event.ticketsAvailable} tickets left`}
      </p>

      {!isSoldOut && (
        <div>
          <button
            onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
            disabled={quantity <= 1}
          >
            -
          </button>

          <span style={{ margin: "0 10px" }}>{quantity}</span>

          <button
            onClick={() =>
              setQuantity((q) => Math.min(q + 1, event.ticketsAvailable))
            }
            disabled={quantity >= event.ticketsAvailable}
          >
            +
          </button>

          <p>You selected {quantity} ticket(s).</p>
        </div>
      )}
    </div>
  );
}
