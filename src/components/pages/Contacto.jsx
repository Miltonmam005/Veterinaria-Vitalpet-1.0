import React from "react";
import "../Styles/contact.css";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { enviarMensaje } from "../../helpers/queries";
import Swal from "sweetalert2";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const respuesta = await enviarMensaje(data);
      if (respuesta && respuesta.ok) {
        Swal.fire({
          title: "¡Mensaje enviado!",
          text: "Tu mensaje se envió correctamente 🐾",
          icon: "success",
        });
        reset();
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo enviar tu mensaje. Intenta nuevamente.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "No se pudo enviar tu mensaje. Intenta nuevamente.",
        icon: "error",
      });
    }
  };

  return (
    <div className="contact-page">
      <Container className="contact-container">
        <Row className="contact-content">
          <Col md={6} className="contact-info">
            <h2 className="mt-4 text-warning">Contactanos |</h2>
            <p className="subtitle">
              Tu mascota merece lo mejor. Contactanos para consultas, turnos o
              urgencias.
            </p>

            <div className="info-section">
              <h4>Ponete en contacto</h4>
              <p>
                Estamos acá para ayudarte con cualquier duda o necesidad que
                tengas sobre la salud y el cuidado de tu mascota. ¡Te
                responderemos lo antes posible!
              </p>

              <ul className="info-list">
                <li>
                  <span className="icon">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <strong>Dirección</strong>
                    <p>1234 Veterinaria, San Miguel de Tucumán, Argentina</p>
                  </div>
                </li>
                <li>
                  <span className="icon">
                    <FaPhoneAlt />
                  </span>
                  <div>
                    <strong>Teléfono</strong>
                    <p>(54) 381-7830</p>
                  </div>
                </li>
                <li>
                  <span className="icon">
                    <FaEnvelope />
                  </span>
                  <div>
                    <strong>E-mail</strong>
                    <p>contact@vitalpet.com</p>
                  </div>
                </li>
              </ul>
            </div>
          </Col>

          <Col md={6} className="contact-form">
            <h4>Enviar un mensaje</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                    minLength: {
                      value: 2,
                      message: "El nombre debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message: "Debe tener menos de 50 caracteres",
                    },
                  })}
                  isInvalid={errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ej: nombre@ejemplo.com"
                  {...register("email", {
                    required: "El correo electrónico es obligatorio",
                    pattern: {
                      value:
                        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                      message:
                        "Ingresá un correo electrónico válido, por ej: pedro@gmail.com",
                    },
                  })}
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formMessage" className="mb-3">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Escribí tu consulta o mensaje aquí..."
                  {...register("mensaje", {
                    required: "El mensaje es obligatorio",
                    minLength: {
                      value: 10,
                      message: "El mensaje debe tener al menos 10 caracteres",
                    },
                    maxLength: {
                      value: 500,
                      message: "El mensaje puede tener máximo 500 caracteres",
                    },
                  })}
                  isInvalid={errors.mensaje}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mensaje?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="warning" type="submit" className="submit-btn">
                Enviar
              </Button>
            </Form>
            <p className="text-muted mt-3 small">
              Respetamos tu privacidad. Tus datos están seguros con nosotros.
            </p>
          </Col>
        </Row>
        <Row className="no-gutters">
          <Col className="p-0">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.105916739557!2d-65.207167!3d-26.836583299999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1760293796926!5m2!1ses-419!2sar"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa RollingCode School"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
