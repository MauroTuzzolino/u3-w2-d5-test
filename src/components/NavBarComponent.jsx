import { Navbar, Container } from "react-bootstrap";
import logo from "../assets/logoMeteo.jpg";

export default function NavbarComponent() {
  return (
    <Navbar variant="dark">
      <Container fluid>
        <Navbar.Brand href="#">
          <img alt="logoMeteo" src={logo} width="40" height="40" className="d-inline-block align-top" /> MeteoApp
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
