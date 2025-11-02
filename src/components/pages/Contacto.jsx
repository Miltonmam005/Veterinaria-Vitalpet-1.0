import React from "react";
import "../Styles/contact.css";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { enviarMensaje } from "../../helpers/queries";
import Swal from "sweetalert2";

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
                  <div></div>