import React, { useEffect, useState } from "react";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import WeatherCard from "./WeatherCard";

const API_KEY = "f56afbf3b13e26c4af6ae68f86743e26";
const cities = ["Torino", "Milano", "Firenze", "Roma", "Napoli"];

export default function WeatherSection() {
  const [weatherData, setWeatherData] = useState({});

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

  return (
    <Container fluid className="my-5">
      <h3 className="text-center mb-4">Previsioni per le principali città</h3>

      {/* Carosello per mobile */}
      <div className="carousel-mobile d-md-none">
        <Carousel indicators={false} interval={null} className="px-5">
          {cities.map((city, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                <WeatherCard city={city} weather={weatherData[city]} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Layout orizzontale fisso per desktop */}
      <div className="carousel-desktop d-none d-md-block">
        <div className="d-flex justify-content-center flex-wrap gap-3">
          {cities.map((city, index) => (
            <div key={index} style={{ minWidth: "200px", maxWidth: "250px" }}>
              <WeatherCard city={city} weather={weatherData[city]} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
