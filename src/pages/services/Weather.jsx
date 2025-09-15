import React, { useEffect, useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [advisory, setAdvisory] = useState("");

  // fetch weather by lat lon
  const fetchWeather = async (lat, lon) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data = await res.json();
      setWeather(data);

      // ✅ Advisory logic
      const humidity = data.main.humidity;
      // const rain = data.rain?.["1h"] || 0; // safe read, default 0 agar rain key missing hai

      if (humidity <= 90) {
        setAdvisory(
          "💡 Humidity high hai lekin baarish kam hai, faslon ko irrigation (सिंचाई) dena chahiye."
        );
      } else if (humidity >= 90) {
        setAdvisory(
          "☔ High humidity ke sath baarish bhi ho rahi hai, irrigation ki zarurat nahi."
        );
      } else {
        setAdvisory(""); // blank if no advisory
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }; // ✅ yaha fetchWeather close karna zaruri tha

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        setError("Location access denied. Please allow location.");
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="weather-wrapper">
        <div className="weather-card">Loading weather...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-wrapper">
        <div className="weather-card error">{error}</div>
      </div>
    );
  }

  return (
    <div className="weather-wrapper">
      <div className="weather-card">
        <h2>
          {weather.name}, {weather.sys.country}
        </h2>
        <div className="weather-main">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <div>
            <h1>{Math.round(weather.main.temp)}°C</h1>
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
        <div className="weather-details">
          <p>🌡️ Feels like: {Math.round(weather.main.feels_like)}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {Math.round(weather.wind.speed)} m/s</p>
          <p>📈 Max: {Math.round(weather.main.temp_max)}°C</p>
          <p>📉 Min: {Math.round(weather.main.temp_min)}°C</p>
        </div>

        {/* ✅ Advisory Section */}
        {advisory && (
          <div className="weather-advisory">
            <strong>{advisory}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
export default Weather;
