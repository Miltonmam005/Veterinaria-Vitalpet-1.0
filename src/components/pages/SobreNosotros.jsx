import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router";
import milton from "../../assets/milton.jpeg";
import "../Styles/SobreNosotros.css";

const SobreNosotros = () => {
  const tecnologias = [
    { nombre: "React", icono: "bi bi-react", color: "info" },
    { nombre: "Bootstrap", icono: "bi bi-bootstrap-fill", color: "purple" },
    { nombre: "JavaScript", icono: "bi bi-file-code", color: "warning" },
    { nombre: "CSS3", icono: "bi bi-palette", color: "primary" },
    { nombre: "HTML5", icono: "bi bi-file-earmark-code", color: "danger" },
    { nombre: "React Router", icono: "bi bi-diagram-3", color: "success" }
  ];

  const funcionalidades = [
    {
      titulo: "Frontend & UI/UX",
      icono: "bi bi-layout-text-window",
      items: [
        "Diseño y desarrollo de la página principal",
        "Páginas informativas y contenido",
        "Navbar y Footer responsive",
        "Diseño de componentes reutilizables"
      ]
    },
    {
      titulo: "Gestión y CRUD",
      icono: "bi bi-database",
      items: [
        "Sistema de administración de productos",
        "Gestión de pacientes y turnos",
        "CRUD completo de servicios",
        "Panel administrativo"
      ]
    },
    {
      titulo: "Autenticación & Seguridad",
      icono: "bi bi-shield-lock",
      items: [
        "Sistema de login y registro",
        "Validación de formularios",
        "Protección de rutas",
        "Manejo de sesiones"
      ]
    },
    {
      titulo: "Experiencia de Usuario",
      icono: "bi bi-person-check",
      items: [
        "Reserva de turnos online",
        "Carrito de compras",
        "Navegación intuitiva",
        "Design responsive"
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="sobre-hero bg-success text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="text-center text-lg-start">
              <h1 className="display-4 fw-bold mb-3">
                Sobre <span className="text-warning">VitalPet</span>
              </h1>
              <p className="lead mb-4">
                Una veterinaria moderna desarrollada con pasión y tecnología de punta 
                para el cuidado de tus mascotas 🐾
              </p>
              <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
                {tecnologias.map((tech, index) => (
                  <Badge key={index} bg={tech.color} className="fs-6 px-3 py-2">
                    <i className={`${tech.icono} me-2`}></i>
                    {tech.nombre}
                  </Badge>
                ))}
              </div>
            </Col>
            <Col lg={4} className="text-center mt-4 mt-lg-0">
              <div className="position-relative">
                <img
                  src="https://images.pexels.com/photos/7469229/pexels-photo-7469229.jpeg"
                  alt="Veterinaria VitalPet"
                  className="img-fluid rounded-3 shadow-lg sobre-hero-img"
                />
                <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-50 text-white p-3 rounded-bottom">
                  <small>Tu mascota en las mejores manos</small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Misión y Visión */}
      <Container className="py-5">
        <Row className="g-4">
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100 bg-light sobre-card">
              <Card.Body className="p-4">
                <div className="text-center mb-3">
                  <i className="bi bi-bullseye text-success display-4"></i>
                </div>
                <h4 className="text-center text-success mb-3">Nuestra Misión</h4>
                <p className="text-center text-muted">
                  Proporcionar atención veterinaria de excelencia combinada con 
                  tecnología moderna para garantizar el bienestar de tus mascotas 
                  y una experiencia excepcional para nuestros clientes.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100 bg-light sobre-card">
              <Card.Body className="p-4">
                <div className="text-center mb-3">
                  <i className="bi bi-eye text-warning display-4"></i>
                </div>
                <h4 className="text-center text-warning mb-3">Nuestra Visión</h4>
                <p className="text-center text-muted">
                  Ser la veterinaria líder en innovación tecnológica, donde cada 
                  mascota reciba cuidado personalizado y cada dueño disfrute de 
                  una plataforma digital intuitiva y confiable.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Valores */}
      <section className="bg-light py-5 sobre-valores">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold text-dark mb-3">
                Nuestros <span className="text-success">Valores</span>
              </h2>
              <p className="lead text-muted">
                Principios que guían cada aspecto de nuestra veterinaria
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 shadow-lg h-100 sobre-valor-card">
                <Card.Body className="text-center p-4">
                  <i className="bi bi-heart-fill text-danger display-4 mb-3"></i>
                  <h5 className="text-dark mb-3">Amor por las Mascotas</h5>
                  <p className="text-muted mb-0">
                    Cada paciente es tratado con el cariño y dedicación que se merece, 
                    como un miembro más de la familia.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-lg h-100 sobre-valor-card">
                <Card.Body className="text-center p-4">
                  <i className="bi bi-shield-check text-success display-4 mb-3"></i>
                  <h5 className="text-dark mb-3">Confianza y Profesionalismo</h5>
                  <p className="text-muted mb-0">
                    Contamos con profesionales certificados y tecnología de vanguardia 
                    para garantizar los mejores resultados.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-lg h-100 sobre-valor-card">
                <Card.Body className="text-center p-4">
                  <i className="bi bi-lightning-charge text-warning display-4 mb-3"></i>
                  <h5 className="text-dark mb-3">Innovación Tecnológica</h5>
                  <p className="text-muted mb-0">
                    Implementamos las últimas tecnologías para ofrecer una experiencia 
                    digital moderna y eficiente.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Desarrollador */}
      <Container className="py-5 sobre-desarrollador">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5 fw-bold text-dark mb-3">
              <span className="text-success">Desarrollador</span> del Proyecto
            </h2>
            <p className="lead text-muted">
              Conoce al creador detrás de VitalPet
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="border-0 shadow-lg overflow-hidden sobre-dev-card">
              <Card.Body className="p-0">
                <Row className="g-0">
                  <Col md={4} className="bg-success">
                    <div className="p-4 text-center text-white h-100 d-flex flex-column justify-content-center sobre-dev-profile">
                      <img
                        src={milton}
                        className="rounded-circle mx-auto mb-3 border border-4 border-white sobre-dev-img"
                        alt="Milton Ramón Mamani"
                      />
                      <h4 className="fw-bold mb-1">Milton Ramón Mamani</h4>
                      <p className="mb-2 opacity-75">Full Stack Developer</p>
                      <div className="d-flex justify-content-center gap-2 flex-wrap">
                        <Badge bg="light" text="dark" className="fs-6">
                          <i className="bi bi-code-slash me-1"></i>
                          React
                        </Badge>
                        <Badge bg="light" text="dark" className="fs-6">
                          <i className="bi bi-bootstrap me-1"></i>
                          Bootstrap
                        </Badge>
                      </div>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className="p-4 sobre-dev-content">
                      <h5 className="text-success mb-4">
                        <i className="bi bi-tools me-2"></i>
                        Funcionalidades Desarrolladas
                      </h5>
                      
                      <Row className="g-3">
                        {funcionalidades.map((func, index) => (
                          <Col md={6} key={index}>
                            <div className="d-flex align-items-start mb-3">
                              <i className={`${func.icono} text-success fs-4 me-3 mt-1`}></i>
                              <div>
                                <h6 className="fw-bold mb-2">{func.titulo}</h6>
                                <ul className="list-unstyled text-muted small">
                                  {func.items.map((item, idx) => (
                                    <li key={idx} className="mb-1">
                                      <i className="bi bi-check-circle text-success me-2"></i>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </Col>
                        ))}
                      </Row>

                      <div className="mt-4 pt-3 border-top">
                        <h6 className="fw-bold text-dark mb-3">Tecnologías Implementadas</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {tecnologias.map((tech, index) => (
                            <Badge key={index} bg="outline-secondary" text="dark" className="fs-6">
                              <i className={`${tech.icono} me-1`}></i>
                              {tech.nombre}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button 
                          variant="outline-success" 
                          size="sm"
                          as={Link}
                          to="/contact"
                          className="sobre-contact-btn"
                        >
                          <i className="bi bi-chat-dots me-2"></i>
                          Contactar al Desarrollador
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA Section */}
      <section className="bg-warning py-4 sobre-cta">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h5 className="text-dark mb-1 fw-bold">
                ¿Interesado en un proyecto similar?
              </h5>
              <p className="text-dark mb-0 opacity-75">
                Desarrollamos aplicaciones web modernas y responsive
              </p>
            </Col>
            <Col md={4} className="text-end">
              <Button 
                variant="dark" 
                size="lg"
                as={Link}
                to="/contact"
                className="sobre-cta-btn"
              >
                <i className="bi bi-rocket-takeoff me-2"></i>
                Iniciar Proyecto
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SobreNosotros;