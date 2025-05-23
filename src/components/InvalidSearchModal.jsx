import { Modal, Button } from "react-bootstrap";

// Questo componente mostra un modale di errore per ricerche non valide
// Props:
// - show: booleano per mostrare o meno il modale
// - onClose: funzione callback quando si chiude
// - message: messaggio da mostrare all'utente

export default function InvalidSearchModal({ show, onClose, message }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>Errore di ricerca</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center justify-content-center" style={{ fontSize: "1.2rem" }}>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
