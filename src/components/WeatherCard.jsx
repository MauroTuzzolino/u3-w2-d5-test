import { Card } from "react-bootstrap";

export default function WeatherCard({ city, weather }) {
  return (
    <Card className="text-center m-2 shadow" style={{ width: "12rem" }}>
      <Card.Body>
        <Card.Title>{city}</Card.Title>
        <Card.Text>
          {weather ? (
            <>
              <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather icon" />
              <div>{weather.temp}&deg;C</div>
              <div>{weather.description}</div>
            </>
          ) : (
            <div>Caricamento...</div>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
