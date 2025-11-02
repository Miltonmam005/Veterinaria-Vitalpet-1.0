import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router";

const DetalleProductos = ({ buscarProductos }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    if (id && buscarProductos) {
      const productoEncontrado = buscarProductos(id);
      setProducto(productoEncontrado);
    }
  }, [id, buscarProductos]);

  // Si no se encuentra el producto
  if (!producto) {
    return (
      <Container className="my-5 text-center">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o ha sido eliminado.</p>
        <Link to="/administrador" className="btn btn-success">
          Volver al catálogo
        </Link>
      </Container>
    );
  }