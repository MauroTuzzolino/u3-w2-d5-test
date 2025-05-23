import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InvalidSearchModal from "./InvalidSearchModal";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setErrorMessage("Inserisci una città valida.");
      setShowError(true);
      return;
    }

    try {
      const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},IT&limit=1&appid=f56afbf3b13e26c4af6ae68f86743e26`);
      const data = await res.json();

      if (!data || data.length === 0) {
        setErrorMessage("Città non trovata.");
        setShowError(true);
      } else {
        setShowError(false);
        navigate(`/details/${city}`);
      }
    } catch (err) {
      setErrorMessage("Errore durante la ricerca. Riprova.");
      setShowError(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="d-flex my-3 justify-content-center" style={{ width: "100%" }}>
        <input
          type="text"
          placeholder="Cerca una città"
          className="form-control me-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ width: "100%", maxWidth: "600px" }}
        />
        <button className="btn" type="submit" style={{ backgroundColor: "#262682", color: "white" }}>
          Cerca
        </button>
      </form>

      <InvalidSearchModal show={showError} onClose={() => setShowError(false)} message={errorMessage} />
    </>
  );
}
