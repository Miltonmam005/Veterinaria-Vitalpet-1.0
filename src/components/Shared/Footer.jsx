import { Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router";
import "../../index.css";

const Footer = () => {
  return (
    <footer className="colorFooter text-center text-lg-start p-3">
      <Container className="text-center text-white">
        <Row>
          <Col
            md={4}
            className="mb-4 mb-md-0 d-flex flex-column align-items-center align-items-md-start"
          >
            <h1 className="titulofoter">VitalPet</h1>
            <p className="m-0 text-white">
              &copy; VitalPet veterinaria. Todos los derechos reservados.
            </p>
            <img
              className="d-inline-block m-lg-1 align-top logoMarca"
              alt="logo Veterinaria"
              src="/LogoVet.png"
              width="50"
              height="50"
            />
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="text-uppercase titulofoter fw-bold mb-3">
              Enlaces Rápidos
            </h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to={"/contact"} 
                  className="text-decoration-none text-white nav-link"
                >
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link
                  to={"/sobreNosotros"} 
                  className="text-decoration-none text-white nav-link"
                >
                  Acerca de nosotros
                </Link>
              </li>
              <li>
                <Link
                  to={"/productos"} 
                  className="text-decoration-none text-white nav-link"
                >
                  Nuestros Productos
                </Link>
              </li>
              <li>
                <Link
                  to={"/login"} 
                  className="text-decoration-none text-white nav-link"
                >
                  Área de Clientes
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="text-uppercase titulofoter fw-bold mb-3">
              Síguenos
            </h5>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a
                href="https://facebook.com/VitalPet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-reset me-3 footerIcon"
              >
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a
                href="https://twitter.com/VitalPet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-reset me-3 footerIcon"
              >
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a
                href="https://instagram.com/VitalPet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-reset me-3 footerIcon"
              >
                <i className="bi bi-instagram fs-4"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;