import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Badge, Alert } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const DetalleProductos = ({ productos }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (id && productos) {
      const productoEncontrado = productos.find(p => 
        p._id === id || p.id === id
      );
      
      // Simular carga
      setTimeout(() => {
        setProducto(productoEncontrado);
        setLoading(false);
      }, 500);
    }
  }, [id, productos]);

  const agregarAlCarrito = () => {
    Swal.fire({
      title: "¡Agregado al carrito!",
      text: `${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} de "${producto.title}"`,
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ver carrito",
      cancelButtonText: "Seguir comprando"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/carrito");
      }
    });
  };

  const formatPrecio = (precio) => {
    if (!precio) return "Consultar precio";
    return typeof precio === 'number' ? `$${precio.toFixed(2)}` : `$${precio}`;
  };

  const getBadgeCategoria = (categoria) => {
    const colores = {
      'Alimentación': 'success',
      'Juguetes': 'warning',
      'Accesorios': 'info',
      'Higiene': 'primary',
      'Camas y Casas': 'secondary',
      'Transporte': 'dark',
      'Salud': 'danger',
      'Ropa': 'light'
    };
    return colores[categoria] || 'secondary';
  };

  const getBadgeTipo = (tipo) => {
    return tipo === 'Producto' ? 'outline-primary' : 'outline-success';
  };

  // Estado de carga
  if (loading) {
    return (
      <Container className="my-5">
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando producto...</span>
          </div>
          <p className="mt-3 text-muted">Cargando información del producto...</p>
        </div>
      </Container>
    );
  }

  // Si no se encuentra el producto
  if (!producto) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          <i className="bi bi-exclamation-triangle display-4 d-block mb-3"></i>
          <h3>Producto no encontrado</h3>
          <p className="mb-3">El producto que buscas no existe o ha sido eliminado.</p>
          <div className="d-flex gap-2 justify-content-center">
            <Link to="/administrador" className="btn btn-success">
              <i className="bi bi-arrow-left me-1"></i>
              Volver al catálogo
            </Link>
            <Link to="/" className="btn btn-outline-success">
              <i className="bi bi-house me-1"></i>
              Ir al inicio
            </Link>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              <i className="bi bi-house me-1"></i>
              Inicio
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/catalogo" className="text-decoration-none">
              <i className="bi bi-grid me-1"></i>
              Catálogo
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {producto.title}
          </li>
        </ol>
      </nav>

      <Card className="shadow-lg border-0 overflow-hidden">
        <Row className="g-0">
          {/* Imagen del producto */}
          <Col lg={6}>
            <div className="position-relative h-100">
              <Card.Img
                variant="top"
                src={producto.image}
                className="img-fluid h-100"
                alt={producto.alt || producto.title}
                style={{ 
                  objectFit: 'cover', 
                  minHeight: '500px',
                  maxHeight: '600px'
                }}
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/69071/pexels-photo-69071.jpeg';
                }}
              />
              
              {/* Badges superpuestos */}
              <div className="position-absolute top-0 start-0 p-3">
                {producto.destacada && (
                  <Badge bg="warning" text="dark" className="fs-6 mb-2">
                    <i className="bi bi-star-fill me-1"></i>Destacado
                  </Badge>
                )}
                {producto.stock !== undefined && producto.stock < 10 && (
                  <Badge bg="danger" className="fs-6 d-block">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    Últimas unidades
                  </Badge>
                )}
              </div>
            </div>
          </Col>

          {/* Información del producto */}
          <Col lg={6}>
            <Card.Body className="p-4 p-lg-5 d-flex flex-column h-100">
              {/* Header con título y badges */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Card.Title className="h1 fw-bold text-dark mb-0">
                    {producto.title}
                  </Card.Title>
                  
                  <div className="d-flex flex-column align-items-end gap-2">
                    <Badge bg={getBadgeTipo(producto.type)} text="dark" className="fs-6">
                      {producto.type || "Producto"}
                    </Badge>
                    <Badge bg={getBadgeCategoria(producto.category)} className="fs-6">
                      {producto.category || "General"}
                    </Badge>
                  </div>
                </div>

                {/* Precio */}
                <div className="mb-4">
                  <h2 className="text-success fw-bold display-4">
                    {formatPrecio(producto.price)}
                  </h2>
                  {producto.stock !== undefined && (
                    <small className={`fw-semibold ${
                      producto.stock > 10 ? 'text-success' : 
                      producto.stock > 0 ? 'text-warning' : 'text-danger'
                    }`}>
                      <i className="bi bi-box-seam me-1"></i>
                      {producto.stock > 0 
                        ? `${producto.stock} disponibles` 
                        : 'Agotado'
                      }
                    </small>
                  )}
                </div>
              </div>

              <hr />

              {/* Descripción breve */}
              {producto.description_breve && (
                <Alert variant="light" className="border">
                  <i className="bi bi-info-circle me-2 text-info"></i>
                  {producto.description_breve}
                </Alert>
              )}

              {/* Descripción amplia */}
              <div className="flex-grow-1 mb-4">
                <h5 className="text-dark mb-3">
                  <i className="bi bi-card-text me-2"></i>
                  Descripción detallada
                </h5>
                <Card.Text className="text-muted lh-lg fs-6">
                  {producto.description_amplia || 
                    "Este producto está diseñado para brindar el mejor cuidado y entretenimiento para tu mascota. Fabricado con materiales de alta calidad y pensado en el bienestar animal."}
                </Card.Text>
              </div>

              {/* Especificaciones */}
              <div className="mb-4">
                <h6 className="text-dark mb-3">
                  <i className="bi bi-list-check me-2"></i>
                  Especificaciones
                </h6>
                <Row className="g-2">
                  <Col sm={6}>
                    <div className="d-flex justify-content-between border-bottom py-1">
                      <span className="text-muted">Tipo:</span>
                      <strong>{producto.type || "Producto"}</strong>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="d-flex justify-content-between border-bottom py-1">
                      <span className="text-muted">Categoría:</span>
                      <strong>{producto.category || "General"}</strong>
                    </div>
                  </Col>
                  {producto.stock !== undefined && (
                    <Col sm={6}>
                      <div className="d-flex justify-content-between border-bottom py-1">
                        <span className="text-muted">Disponibilidad:</span>
                        <strong className={
                          producto.stock > 10 ? 'text-success' : 
                          producto.stock > 0 ? 'text-warning' : 'text-danger'
                        }>
                          {producto.stock > 0 ? 'En stock' : 'Agotado'}
                        </strong>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>

              {/* Acciones */}
              <div className="mt-auto">
                {producto.stock === 0 ? (
                  <Alert variant="warning" className="text-center">
                    <i className="bi bi-clock-history me-2"></i>
                    Producto temporalmente agotado
                  </Alert>
                ) : (
                  <div className="row g-3 align-items-center">
                    <Col xs={12} sm={4}>
                      <div className="d-flex align-items-center">
                        <label htmlFor="cantidad" className="form-label mb-0 me-2">
                          Cantidad:
                        </label>
                        <select 
                          id="cantidad"
                          className="form-select"
                          value={cantidad}
                          onChange={(e) => setCantidad(parseInt(e.target.value))}
                          style={{ width: '80px' }}
                        >
                          {[...Array(Math.min(10, producto.stock || 10)).keys()].map(num => (
                            <option key={num + 1} value={num + 1}>
                              {num + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Col>
                    <Col xs={12} sm={8}>
                      <Button
                        variant="success"
                        size="lg"
                        className="w-100"
                        onClick={agregarAlCarrito}
                        disabled={producto.stock === 0}
                      >
                        <i className="bi bi-cart-plus me-2"></i>
                        Agregar al Carrito
                      </Button>
                    </Col>
                  </div>
                )}
                
                {/* Acciones secundarias */}
                <div className="d-flex gap-2 mt-3">
                  <Button
                    variant="outline-secondary"
                    className="flex-fill"
                    onClick={() => navigate(-1)}
                  >
                    <i className="bi bi-arrow-left me-1"></i>
                    Volver
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="flex-fill"
                  >
                    <i className="bi bi-heart me-1"></i>
                    Favorito
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleProductos;