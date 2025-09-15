import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">🌾 Smart Farming Advisory System</h1>
        <p className="hero-subtitle">
          Empowering farmers with AI-driven solutions for soil health, weather
          insights, pest control, market trends, and more.
        </p>
        <Link to="/services" className="btn-primary">
          Explore Services
        </Link>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2 className="section-title">🌱 Our Key Services</h2>

        <div className="services-grid">
          <Link to="/services/soil" className="service-card soil">
            <h3>Soil Testing</h3>
            <p>Analyze soil health and get fertilizer recommendations.</p>
          </Link>

          <Link to="/services/weather" className="service-card weather">
            <h3>Weather Forecast</h3>
            <p>Get accurate local weather forecasts for better planning.</p>
          </Link>

          <Link to="/services/pest" className="service-card pest">
            <h3>Pest & Disease Detection</h3>
            <p>Upload or capture crop images to detect pests instantly.</p>
          </Link>

          <Link to="/services/market" className="service-card market">
            <h3>Market Prices</h3>
            <p>Stay updated with real-time mandi prices & trends.</p>
          </Link>
{/* 
          <Link to="/services/chatbot" className="service-card chatbot">
            <h3>AI Chatbot</h3>
            <p>Ask questions in your language & get instant advice.</p>
          </Link> */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to transform your farming?</h2>
        <p>Start using our smart advisory system today.</p>
        <Link to="/support" className="btn-secondary">
          Get Support
        </Link>
      </section>
    </div>
  );
};

export default Home;
