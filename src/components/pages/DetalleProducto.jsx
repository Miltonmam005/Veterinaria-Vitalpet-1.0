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
  return (
    <Container className="my-3">
      <Link
        className="text-decoration-none text-success-emphasis"
        to={"/administrador"}
      >
        <i className="bi bi-arrow-left mx-2"></i>Volver al Catálogo
      </Link>
      <Card className="my-3 shadow" border="success">
        <Row>
          <Col sm={12} md={6}>
            <Card.Img
              variant="top"
              src={producto.image}
              className="imagen-detalle-producto img-fluid"
              alt={producto.alt || producto.title}
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </Col>
          <Col sm={12} md={6} className="h-100">
            <Card.Body className="d-flex flex-column h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="text-start Raleway display-5">
                  {producto.title}
                </Card.Title>
                {producto.destacada && (
                  <span className="badge bg-warning text-dark fs-6">
                    <i className="bi bi-star-fill me-1"></i>Destacado
                  </span>
                )}
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center my-4 p-3 border border-warning rounded bg-light">
                <Card.Text className="text-center mb-0 fw-bold">
                  {producto.type || "Producto"}
                </Card.Text>
                <Card.Text className="text-center mb-0 fw-bold">
                  Categoría: {producto.category || "General"}
                </Card.Text>
              </div>

              {producto.price && (
                <div className="text-center my-4">
                  <h2 className="text-success fw-bold">{producto.price}</h2>
                </div>
              )}

              <Card.Text className="tinos mb-4 flex-grow-1">
                {producto.description_amplia || "Descripción no disponible"}
              </Card.Text>

              <div className="mt-auto">
                <div className="mb-3">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    {producto.description_breve ||
                      "Producto de calidad para tu mascota"}
                  </small>
                </div>

                <Button
                  variant="success"
                  size="lg"
                  className="w-100"
                  onClick={() => {
                    /* Aquí puedes agregar la lógica de compra */
                  }}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Agregar al Carrito
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleProductos;
