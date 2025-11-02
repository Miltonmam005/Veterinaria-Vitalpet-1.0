import { Button, Table } from "react-bootstrap";
import ItemProductos from "./componentesAdministrador/ItemProductos.jsx";
import { Link } from "react-router";
import { cardsData } from "../data/cardsData.js";

const Administrador = ({
  productos,
  setProductos,
  borrarProducto,
  destacarProducto,
}) => {
  const cargarDatosPrueba = () => {
    setProductos(cardsData);
  };

  