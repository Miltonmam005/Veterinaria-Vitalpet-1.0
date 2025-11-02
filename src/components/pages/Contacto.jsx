import React from "react";
import "../Styles/contact.css";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { enviarMensaje } from "../../helpers/queries";
import Swal from "sweetalert2";
