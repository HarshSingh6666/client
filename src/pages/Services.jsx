import React from "react";
import { Link } from "react-router-dom";
import "./Service.css";

const Services = () => {
  return (
    <div className="services-page">
      <h1>Our Services</h1>
      <div className="services-grid">
        <div className="service-card">
          <h2>🌱 Soil Analysis</h2>
          <p>Get detailed insights on soil quality to boost productivity.</p>
          <Link to="/services/soil">Learn More →</Link>
        </div>

        <div className="service-card">
          <h2>☀️ Weather Forecast</h2>
          <p>Accurate weather updates to plan your farming activities.</p>
          <Link to="/services/weather">Learn More →</Link>
        </div>

        <div className="service-card">
          <h2>🐛 Pest & Disease Advisory</h2>
          <p>AI-powered advice to protect your crops from diseases.</p>
          <Link to="/services/pest">Learn More →</Link>
        </div>

        <div className="service-card">
          <h2>📈 Market Price Updates</h2>
          <p>Stay updated with real-time mandi prices for your crops.</p>
          <Link to="/services/market">Learn More →</Link>
        </div>

        {/* <div className="service-card">
          <h2>🤖 AI Chatbot Assistance</h2>
          <p>24/7 chatbot support for all your farming-related queries.</p>
          <Link to="/services/chatbot">Learn More →</Link>
        </div> */}
      </div>
    </div>
  );
};

export default Services;
