import { Card } from "react-bootstrap";

// Componente riutilizzabile per visualizzare una card meteo
// riceve `city` (nome città) e `weather` (oggetto con temp, icon, description)

export default function WeatherCard({ city, weather }) {
  return (
    <Card className="text-center m-2 shadow" style={{ width: "12rem" }}>
      <Card.Body>
        <Card.Title>{city}</Card.Title>
        <Card.Text>
          {weather ? (
            <>
              {/* Se i dati meteo sono disponibili, mostro icona + temperatura + descrizione */}
              <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather icon" />
              <div>{weather.temp}&deg;C</div>
              <div>{weather.description}</div>
            </>
          ) : (
            // Se `weather` è null o undefined, mostro un messaggio di caricamento
            <div>Caricamento...</div>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
