// ...existing code...
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Menu = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <img
              src="/gato-COMPRANDO.jpg"
              width="40"
              height="40"
              className="rounded-circle me-2 logoMarca"
              style={{ objectFit: "cover" }}
              alt="Logo Vital Pet"
            />
            Vital Pet
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Inicio</Nav.Link>
              <Nav.Link href="#">Logiuon</Nav.Link>
              <NavDropdown title="Turnos" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Turnos disponibles</NavDropdown.Item>
                <NavDropdown.Item href="#">turno mañana</NavDropdown.Item>
                <NavDropdown.Item href="#">turno tarde</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>

              <Nav.Link href="#" className="d-flex align-items-center">
                <img
                  src="/gato-COMPRANDO.jpg"
                  width="40"
                  height="40"
                  className="rounded-circle logoCarrito"
                  style={{ objectFit: "cover" }}
                  alt="Carrito de Compras"
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
// ...existing code...