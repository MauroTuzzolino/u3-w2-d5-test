import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

export default function RecentSearches() {
  const [recent, setRecent] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false); // stato per visibilità modale
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecent(stored);
  }, []);

  const handleClick = (city) => {
    navigate(`/details/${city}`);
  };

  const handleClearConfirmed = () => {
    localStorage.removeItem("recentSearches");
    setRecent([]);
    setShowConfirm(false);
  };

  if (recent.length === 0) return null;

  return (
    <div className="text-center my-3">
      {/* Titolo + pulsante per svuotare (apre il modale) */}
      <div className="d-flex justify-content-center align-items-center gap-3 mb-2 flex-wrap">
        <h5 className="mb-0">Ricerche recenti</h5>
        <Button variant="outline-danger" size="sm" onClick={() => setShowConfirm(true)}>
          Svuota
        </Button>
      </div>

      {/* Elenco dei bottoni per le città */}
      <div className="d-flex justify-content-center flex-wrap gap-2">
        {recent.map((city, index) => (
          <Button key={index} variant="outline-dark" size="sm" onClick={() => handleClick(city)}>
            {city}
          </Button>
        ))}
      </div>

      {/* Modale di conferma per svuotare le ricerche */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Conferma</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler cancellare tutte le ricerche recenti?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleClearConfirmed}>
            Sì, svuota
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
