import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router"; 

const Menu = ({ usuarioAdmin, setUsuarioAdmin }) => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary colorNav">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="/logoVet.png"
              width="40"
              height="40"
              className="rounded-circle me-2 logoMarca fuenteLogo color-logo-nav fuentetextos"
              style={{ objectFit: "cover" }}
              alt="Logo Vital Pet"
            />
            Vital Pet
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/sobreNosotros">Sobre Nosotros</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
              
              {/* Login/Logout condicional */}
              {usuarioAdmin ? (
                <NavDropdown title="Administración" id="admin-dropdown">
                  <NavDropdown.Item as={Link} to="/administrador">
                    Panel Admin
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/administrar-pacientes">
                    Pacientes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => setUsuarioAdmin(false)}>
                    Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              )}

              <NavDropdown title="Turnos" id="turnos-dropdown">
                <NavDropdown.Item as={Link} to="/administrar-turnos">
                  Turnos disponibles
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/turnos-manana">
                  Turno mañana
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/turnos-tarde">
                  Turno tarde
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={Link} to="/carrito" className="d-flex align-items-center">
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