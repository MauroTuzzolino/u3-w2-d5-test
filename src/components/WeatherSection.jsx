import React, { useEffect, useState } from "react";
import { Container, Carousel, Spinner } from "react-bootstrap";
import WeatherCard from "./WeatherCard";
import { useNavigate } from "react-router-dom";

const API_KEY = "f56afbf3b13e26c4af6ae68f86743e26";
const cities = ["Torino", "Milano", "Firenze", "Roma", "Napoli"];

export default function WeatherSection() {
  const [weatherData, setWeatherData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
      const newWeatherData = {};
      for (const city of cities) {
        try {
          const geoRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},IT&limit=1&appid=${API_KEY}`);
          const geoData = await geoRes.json();
          if (!geoData[0]) continue;

          const { lat, lon } = geoData[0];
          const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${API_KEY}`);
          const weather = await weatherRes.json();

          newWeatherData[city] = {
            temp: Math.round(weather.main.temp),
            description: weather.weather[0].description,
            icon: weather.weather[0].icon,
          };
        } catch (error) {
          console.error("Errore nel recupero meteo per", city, error);
        }
      }
      setWeatherData(newWeatherData);
    };

    fetchWeather();
  }, []);

  if (Object.keys(weatherData).length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <Spinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Caricamento...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4">Previsioni per le principali città</h3>

      {/* Mobile - Carousel */}
      <div className="d-md-none">
        <Carousel indicators={false} interval={null} className="px-5">
          {cities.map((city, index) => (
            <Carousel.Item key={index}>
              <div onClick={() => navigate(`/details/${city}`)} style={{ cursor: "pointer" }} className="card-hover d-flex justify-content-center">
                <WeatherCard city={city} weather={weatherData[city]} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Desktop - Grid */}
      <div className="d-none d-md-block">
        <div className="d-flex justify-content-between flex-wrap">
          {cities.map((city, index) => (
            <div
              key={index}
              onClick={() => navigate(`/details/${city}`)}
              style={{ cursor: "pointer", flex: "1 1 20%", minWidth: "200px" }}
              className="card-hover d-flex justify-content-center"
            >
              <WeatherCard city={city} weather={weatherData[city]} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
