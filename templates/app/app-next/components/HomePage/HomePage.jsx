"use client";

import { useEffect, useState } from "react";

import EventList from "@/components/EventList/EventList";
import api from "@/utils/api";

import "./HomePage.css";

function HomePage() {
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    async function fetchFeaturedEvent() {
      try {
        const response = await fetch(api("/events"));

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        setEventCount(data.length);

        const sorted = [...data].sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );

        setFeaturedEvent(sorted[0]);
      } catch (err) {
        console.error(err);
      }
    }

    fetchFeaturedEvent();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-glow hero-glow--one"></div>
        <div className="hero-glow hero-glow--two"></div>

        <div className="hero-content">
          <span className="hero-pill">Discover Denmark’s top tech events</span>

          <h1 className="hero__title">
            Build connections.
            <br />
            Learn faster.
            <br />
            Attend smarter.
          </h1>

          <p className="hero__text">
            Explore conferences, workshops, hackathons, and meetups designed for
            developers and tech enthusiasts.
          </p>

          <div className="hero-stats">
            <div className="hero-stat-card">
              <h2>{eventCount}+</h2>
              <p>Upcoming Events</p>
            </div>

            <div className="hero-stat-card">
              <h2>2026</h2>
              <p>Tech Community</p>
            </div>

            <div className="hero-stat-card">
              <h2>DK</h2>
              <p>Across Denmark</p>
            </div>
          </div>

          {featuredEvent && (
            <div className="featured-event">
              <div className="featured-left">
                <span className="featured-badge">Next Event</span>

                <h2>{featuredEvent.name}</h2>

                <p>
                  {featuredEvent.date} • {featuredEvent.time}
                </p>

                <p>
                  {featuredEvent.venue}, {featuredEvent.city}
                </p>
              </div>

              <img
                src={featuredEvent.image}
                alt={featuredEvent.name}
                className="featured-image"
              />
            </div>
          )}
        </div>
      </section>

      <main>
        <EventList />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <p>© HackYourFuture Denmark</p>

            <span>|</span>

            <a
              href="https://www.hackyourfuture.dk/"
              target="_blank"
              rel="noreferrer"
            >
              Official Website
            </a>

            <span>|</span>

            <a href="mailto:info@hackyourfuture.dk">info@hackyourfuture.dk</a>
          </div>

          <div className="footer-socials">
            <a
              href="https://www.hackyourfuture.dk/"
              target="_blank"
              rel="noreferrer"
            >
              🌐
            </a>

            <a
              href="https://www.linkedin.com/school/hackyourfuture-denmark/"
              target="_blank"
              rel="noreferrer"
            >
              in
            </a>

            <a
              href="https://www.instagram.com/hackyourfuture.dk/"
              target="_blank"
              rel="noreferrer"
            >
              ◎
            </a>

            <a
              href="https://github.com/HackYourFuture-CPH"
              target="_blank"
              rel="noreferrer"
            >
              GH
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
