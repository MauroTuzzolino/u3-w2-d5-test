import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import clearImg from "../assets/clear.jpg";
import rainImg from "../assets/rain.jpg";
import cloudsImg from "../assets/clouds.jpg";

const API_KEY = "f56afbf3b13e26c4af6ae68f86743e26";

const weatherBackgrounds = {
  Clear: clearImg,
  Rain: rainImg,
  Clouds: cloudsImg,
};

export default function DetailsPage() {
  const { city } = useParams();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [background, setBackground] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const geoRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},IT&limit=1&appid=${API_KEY}`);
      const geoData = await geoRes.json();
      if (!geoData[0]) return;

      const { lat, lon } = geoData[0];

      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${API_KEY}`);
      const weatherData = await weatherRes.json();
      setCurrent({
        temp: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        main: weatherData.weather[0].main,
        wind: weatherData.wind.speed,
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        date: new Date().toLocaleDateString("it-IT", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      });

      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${API_KEY}`);
      const forecastData = await forecastRes.json();
      const today = new Date().toISOString().split("T")[0];
      const forecastDays = new Set();
      const daily = forecastData.list.filter((item) => {
        if (!item.dt_txt.includes("12:00:00")) return false;
        const date = item.dt_txt.split(" ")[0];
        if (date === today) return false;
        if (forecastDays.size >= 5) return false;
        if (!forecastDays.has(date)) {
          forecastDays.add(date);
          return true;
        }
        return false;
      });
      setForecast(daily.slice(0, 5));

      const mainWeather = weatherData.weather[0].main;
      if (weatherBackgrounds[mainWeather]) {
        setBackground(weatherBackgrounds[mainWeather]);
      }
    };

    fetchDetails();
  }, [city]);

  if (!current) return <div className="text-center text-light my-5">Caricamento dati...</div>;

  return (
    <Container fluid className="text-light py-4" style={{ maxWidth: "1200px" }}>
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h2>{city.charAt(0).toUpperCase() + city.slice(1)}</h2>
          <Button variant="outline-light" onClick={() => navigate("/")}>
            Torna alla Home
          </Button>
        </Col>
      </Row>

      <Row
        className="rounded shadow overflow-hidden"
        style={{
          minHeight: "400px",
          backgroundImage: background ? `url(${background})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Col md={8} className="position-relative p-4 text-white">
          <h1 className="px-3">{current.temp}&deg;C</h1>
          <div className="d-flex align-items-center">
            <img src={`http://openweathermap.org/img/wn/${current.icon}@2x.png`} alt="weather icon" />
            <h5 className="ms-2 text-capitalize mb-0">{current.description}</h5>
          </div>
        </Col>
        <Col md={4} className="text-white p-4" style={{ backgroundColor: "rgba(49, 53, 56, 0.83)", fontSize: "1.2rem" }}>
          <h5 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
            {current.date
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h5>
          <p>Vento: {current.wind} km/h</p>
          <p>Umidità: {current.humidity}%</p>
          <p>Pressione: {current.pressure} hPa</p>
        </Col>
      </Row>

      <Row className="mt-4 bg-dark rounded text-white py-3">
        <h5 className="text-center mb-3">Previsioni per prossimi 4 giorni</h5>
        <div className="d-flex justify-content-around">
          {forecast.map((item, index) => (
            <div key={index} className="text-center mx-2">
              <p>{new Date(item.dt_txt).toLocaleDateString("it-IT", { weekday: "short" })}</p>
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="" />
              <p>{Math.round(item.main.temp)}&deg;C</p>
            </div>
          ))}
        </div>
      </Row>
    </Container>
  );
}
