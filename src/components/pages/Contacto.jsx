 correccion
import React, { useState } from "react";
import "../Styles/contacto.css";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaWhatsapp } from "react-icons/fa";
// import { enviarMensaje } from "../../helpers/queries";
import Swal from "sweetalert2";

const Contacto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const respuesta = await enviarMensaje(data);
      if (respuesta && respuesta.ok) {
        setEnviado(true);
        Swal.fire({
          title: "¡Mensaje enviado! 🐾",
          html: `
            <div class="text-center">
              <i class="bi bi-check-circle-fill text-success display-4 d-block mb-3"></i>
              <p class="mb-2">Tu mensaje se envió correctamente</p>
              <small class="text-muted">Te contactaremos dentro de las próximas 24 horas</small>
            </div>
          `,
          icon: "success",
          confirmButtonColor: "#198754",
          timer: 4000,
          showConfirmButton: true
        });
        reset();
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error al enviar",
        html: `
          <div class="text-center">
            <i class="bi bi-exclamation-triangle text-danger display-4 d-block mb-3"></i>
            <p>No se pudo enviar tu mensaje</p>
            <small class="text-muted">Podés contactarnos directamente por WhatsApp</small>
          </div>
        `,
        icon: "error",
        confirmButtonColor: "#dc3545",
        showCancelButton: true,
        cancelButtonText: "Cerrar",
        confirmButtonText: "Contactar por WhatsApp"
      }).then((result) => {
        if (result.isConfirmed) {
          window.open('https://wa.me/543817830000', '_blank');
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const horariosAtencion = [
    { dia: "Lunes a Viernes", horario: "8:00 - 20:00 hs" },
    { dia: "Sábados", horario: "9:00 - 18:00 hs" },
    { dia: "Domingos", horario: "10:00 - 14:00 hs" },
    { dia: "Emergencias", horario: "24/7" }
  ];

  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <section className="bg-success text-white py-4">
        <Container>
          <Row>
            <Col className="text-center">
              <h1 className="display-5 fw-bold mb-3">
                <i className="bi bi-chat-heart me-3"></i>
                Contacto
              </h1>
              <p className="lead mb-0">
                Estamos aquí para cuidar de tu mascota. Consultas, turnos y emergencias.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="g-4">
          {/* Información de Contacto */}
          <Col lg={5}>
            <Card className="shadow-lg border-0 h-100">
              <Card.Header className="bg-success text-white py-3">
                <h4 className="mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  Información de Contacto
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="mb-4">
                  <h5 className="text-success mb-3">
                    <i className="bi bi-geo-alt me-2"></i>
                    Nuestra Ubicación
                  </h5>
                  <div className="d-flex align-items-start mb-3">
                    <div className="text-success me-3 mt-1">
                      <FaMapMarkerAlt size={20} />
                    </div>
                    <div>
                      <strong>VitalPet Veterinaria</strong>
                      <p className="mb-0 text-muted">
                        Av. Siria 2500<br />
                        San Miguel de Tucumán<br />
                        Tucumán, Argentina
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-success mb-3">
                    <i className="bi bi-telephone me-2"></i>
                    Teléfonos
                  </h5>
                  <div className="d-flex align-items-start mb-2">
                    <div className="text-success me-3 mt-1">
                      <FaPhoneAlt size={18} />
                    </div>
                    <div>
                      <strong>Consultas y Turnos</strong>
                      <p className="mb-0 text-muted">(381) 430-7890</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <div className="text-success me-3 mt-1">
                      <FaWhatsapp size={18} />
                    </div>
                    <div>
                      <strong>WhatsApp</strong>
                      <p className="mb-0 text-muted">+54 9 381 512-3456</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-success mb-3">
                    <i className="bi bi-envelope me-2"></i>
                    Correo Electrónico
                  </h5>
                  <div className="d-flex align-items-start">
                    <div className="text-success me-3 mt-1">
                      <FaEnvelope size={18} />
                    </div>
                    <div>
                      <strong>Email Principal</strong>
                      <p className="mb-0 text-muted">info@vitalpet.com</p>
                      <small className="text-muted">consultas@vitalpet.com</small>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-success mb-3">
                    <i className="bi bi-clock me-2"></i>
                    Horarios de Atención
                  </h5>
                  {horariosAtencion.map((horario, index) => (
                    <div key={index} className="d-flex justify-content-between border-bottom py-2">
                      <span className={horario.dia === "Emergencias" ? "fw-bold text-danger" : ""}>
                        {horario.dia}
                      </span>
                      <span className={horario.dia === "Emergencias" ? "fw-bold text-danger" : "text-muted"}>
                        {horario.horario}
                      </span>
                    </div>
                  ))}
                </div>

                <Alert variant="info" className="mt-4">
                  <i className="bi bi-lightning me-2"></i>
                  <strong>Servicio de Emergencias 24/7</strong>
                  <p className="mb-0 small">Atendemos urgencias las 24 horas</p>
                </Alert>

                <Button 
                  variant="success" 
                  className="w-100 mt-3"
                  onClick={() => window.open('https://wa.me/5493815123456', '_blank')}
                >
                  <FaWhatsapp className="me-2" />
                  Contactar por WhatsApp
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Formulario de Contacto */}
          <Col lg={7}>
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-warning text-dark py-3">
                <h4 className="mb-0">
                  <i className="bi bi-chat-dots me-2"></i>
                  Enviar Mensaje
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                {enviado && (
                  <Alert variant="success" className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                    <div>
                      <strong>¡Mensaje enviado con éxito!</strong>
                      <p className="mb-0">Te contactaremos pronto.</p>
                    </div>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <i className="bi bi-person me-1"></i>
                          Nombre Completo *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ej: Juan Pérez"
                          {...register("nombre", {
                            required: "El nombre es obligatorio",
                            minLength: {
                              value: 2,
                              message: "Debe tener al menos 2 caracteres",
                            },
                            maxLength: {
                              value: 50,
                              message: "Máximo 50 caracteres",
                            },
                          })}
                          isInvalid={errors.nombre}
                          className="py-2"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.nombre?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <i className="bi bi-envelope me-1"></i>
                          Correo Electrónico *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Ej: nombre@ejemplo.com"
                          {...register("email", {
                            required: "El correo electrónico es obligatorio",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Ingresá un correo electrónico válido",
                            },
                          })}
                          isInvalid={errors.email}
                          className="py-2"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-chat-text me-1"></i>
                      Asunto
                    </Form.Label>
                    <Form.Select 
                      {...register("asunto")}
                      className="py-2"
                    >
                      <option value="">Seleccionar asunto...</option>
                      <option value="consulta">Consulta General</option>
                      <option value="turno">Solicitud de Turno</option>
                      <option value="emergencia">Emergencia</option>
                      <option value="producto">Consulta sobre Productos</option>
                      <option value="otros">Otros</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-pencil me-1"></i>
                      Mensaje *
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Escribí tu consulta o mensaje aquí. Incluí el nombre de tu mascota y los síntomas si corresponde..."
                      {...register("mensaje", {
                        required: "El mensaje es obligatorio",
                        minLength: {
                          value: 10,
                          message: "El mensaje debe tener al menos 10 caracteres",
                        },
                        maxLength: {
                          value: 1000,
                          message: "El mensaje puede tener máximo 1000 caracteres",
                        },
                      })}
                      isInvalid={errors.mensaje}
                      className="py-2"
                    />
                    <Form.Text className="text-muted">
                      {errors.mensaje ? errors.mensaje.message : "Máximo 1000 caracteres"}
                    </Form.Text>
                  </Form.Group>

                  <div className="d-grid">
                    <Button 
                      variant="warning" 
                      type="submit" 
                      size="lg"
                      disabled={loading}
                      className="fw-semibold py-2"
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send me-2"></i>
                          Enviar Mensaje
                        </>
                      )}
                    </Button>
                  </div>
                </Form>

                <Alert variant="light" className="mt-4 border">
                  <i className="bi bi-shield-check text-success me-2"></i>
                  <small className="text-muted">
                    Respetamos tu privacidad. Tus datos están seguros con nosotros y no los compartiremos con terceros.
                  </small>
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Mapa */}
        <Row className="mt-5">
          <Col>
            <Card className="shadow-lg border-0">
              <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">
                  <i className="bi bi-geo-alt me-2"></i>
                  Encuéntranos
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="map-container" style={{ height: '400px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.105916739557!2d-65.207167!3d-26.836583299999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1760293796926!5m2!1ses-419!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de VitalPet Veterinaria"
                  ></iframe>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contacto;