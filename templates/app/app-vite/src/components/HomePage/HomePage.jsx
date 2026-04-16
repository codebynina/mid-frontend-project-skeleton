// Feel free to replace the content of this component with your own
import EventList from "../EventList/EventList";

function HomePage() {
  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h1>Upcoming Events</h1>
      <p>Browse and book tickets for events.</p>

      <EventList />
    </div>
  );
}

export default HomePage;
