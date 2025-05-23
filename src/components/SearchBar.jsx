import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InvalidSearchModal from "./InvalidSearchModal";

export default function SearchBar() {
  const [city, setCity] = useState(""); // stato per il testo inserito
  const [showError, setShowError] = useState(false); // stato per visibilità del modale
  const [errorMessage, setErrorMessage] = useState(""); // messaggio personalizzato per il modale
  const navigate = useNavigate();

  // Gestione del submit del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valido l'input – non accetto stringhe vuote o spazi
    if (!city.trim()) {
      setErrorMessage("Inserisci una città valida.");
      setShowError(true);
      return;
    }

    try {
      // Faccio una chiamata all'API di geolocalizzazione per vedere se la città esiste
      const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},IT&limit=1&appid=f56afbf3b13e26c4af6ae68f86743e26`);
      const data = await res.json();

      // Se non trovo nulla, mostro errore
      if (!data || data.length === 0) {
        setErrorMessage("Città non trovata.");
        setShowError(true);
      } else {
        setShowError(false);
        navigate(`/details/${city}`);
      }
    } catch (err) {
      // Errore generico – messaggio standard
      setErrorMessage("Errore durante la ricerca. Riprova.");
      setShowError(true);
    }
  };

  return (
    <>
      {/* Form di ricerca con input e bottone */}
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

      {/* Mostro il modale solo se showError è true */}
      <InvalidSearchModal
        show={showError}
        onClose={() => setShowError(false)} // chiusura del modale
        message={errorMessage} // messaggio dinamico
      />
    </>
  );
}
