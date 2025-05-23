import { Container } from "react-bootstrap";

export default function FooterComponent() {
  return (
    <footer className="py-4 fs-5 text-center">
      <Container>
        <small>
          © 2025 MeteoApp - Tutti i diritti riservati. <br />
          Info tarocche: questo sito predice il futuro, forse.
        </small>
      </Container>
    </footer>
  );
}
