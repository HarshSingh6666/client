import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // check login

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">🌾 Smart Farming Advisory System</h1>
        <p className="hero-subtitle">
          Empowering farmers with AI-driven solutions for soil health, weather
          insights, pest control, market trends, and more.
        </p>
        <Link
          to={token ? "/services" : "#"}
          className={`btn-primary ${!token ? "disabled-link" : ""}`}
          onClick={(e) => {
            if (!token) {
              e.preventDefault();
              alert("❌ Please login first!");
              navigate("/login");
            }
          }}
        >
          Explore Services
        </Link>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2 className="section-title">🌱 Our Key Services</h2>

        <div className="services-grid">
          {[
            { path: "/services/soil", title: "Soil Testing", desc: "Analyze soil health and get fertilizer recommendations.", cls: "soil" },
            { path: "/services/weather", title: "Weather Forecast", desc: "Get accurate local weather forecasts for better planning.", cls: "weather" },
            { path: "/services/pest", title: "Pest & Disease Detection", desc: "Upload or capture crop images to detect pests instantly.", cls: "pest" },
            { path: "/services/market", title: "Market Prices", desc: "Stay updated with real-time mandi prices & trends.", cls: "market" },
          ].map((service, index) => (
            <Link
              key={index}
              to={token ? service.path : "#"}
              className={`service-card ${service.cls} ${!token ? "disabled-link" : ""}`}
              onClick={(e) => {
                if (!token) {
                  e.preventDefault();
                  alert("❌ Please login first!");
                  navigate("/login");
                }
              }}
            >
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to transform your farming?</h2>
        <p>Start using our smart advisory system today.</p>
        <Link
          to={token ? "/support" : "#"}
          className={`btn-secondary ${!token ? "disabled-link" : ""}`}
          onClick={(e) => {
            if (!token) {
              e.preventDefault();
              alert("❌ Please login first!");
              navigate("/login");
            }
          }}
        >
          Get Support
        </Link>
      </section>
    </div>
  );
};

export default Home;
