import { Container, Form, FormControl, Button } from "react-bootstrap";

export default function SearchBar() {
  return (
    <Container className="my-5 text-center">
      <h2>Controlla il meteo nella tua città!!</h2>
      <Form className="d-flex justify-content-center mt-4">
        <FormControl type="search" placeholder="Cerca città..." className="me-2" aria-label="Search" />
        <Button variant="primary">Cerca</Button>
      </Form>
    </Container>
  );
}
