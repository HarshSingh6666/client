import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Support from "./pages/Support";
import ChatbotPage from "./pages/ChatbotPage";
// Service detail pages
import Soil from "./pages/services/Soil";
import Weather from "./pages/services/Weather";
import Pest from "./pages/services/Pest";
import Market from "./pages/services/Market";
import ChatbotService from "./pages/services/ChatbotService";

function App() {
  return (
    <MainLayout>
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/support" element={<Support />} />

        {/* Service detail pages */}
        <Route path="/services/soil" element={<Soil />} />
        <Route path="/services/weather" element={<Weather />} />
        <Route path="/services/pest" element={<Pest />} />
        <Route path="/services/market" element={<Market />} />
        <Route path="/services/chatbot" element={<ChatbotService />} />

        {/* 404 fallback */}
        <Route path="*" element={<h2 className="p-4">404 - Page Not Found</h2>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
