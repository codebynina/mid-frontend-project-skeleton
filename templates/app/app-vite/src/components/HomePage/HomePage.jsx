// Feel free to replace the content of this component with your own
import EventList from "../EventList/EventList";

function HomePage() {
  return (
    <div className="home-page">
      <header className="hero">
        <h1 className="hero__title">Upcoming Events</h1>
        <p className="hero__text">
          Browse conferences, workshops, and hackathons happening soon.
        </p>
      </header>

      <main>
        <EventList />
      </main>

      <footer className="footer">
        <p>HYF React Project — Week 1</p>
      </footer>
    </div>
  );
}

export default HomePage;