import { Navbar, Container } from "react-bootstrap";
import logo from "../assets/logoMeteo.jpg";

export default function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#">
          <img alt="logoMeteo" src={logo} width="30" height="30" className="d-inline-block align-top" /> MeteoApp
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
