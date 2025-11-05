import React, { useState } from "react";
import { Button, Image, Card, Badge, Alert } from "react-bootstrap";
import { NavLink } from "react-router";
import { useCart } from "../../helpers/CartContext";
import Swal from "sweetalert2";
import WhatsAppButton from "./categorias/funcion/WhatsAppButton";
import "../Styles/Carrito.css";

const Carrito = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();

  const totalPrice = getTotalPrice();
  const displayTotal = typeof totalPrice === "number" ? totalPrice : 0;

  const [animationStage, setAnimationStage] = useState("idle");

  const handlePagar = async () => {
    const productosFormateados = cartItems.map((item) => ({
      id: item._id || item.id,
      quantity: item.quantity,
    }));
    
    try {
      // Simulación de API de pago - adapta con tu endpoint real
      Swal.fire({
        title: "Procesando pago...",
        text: "Estamos preparando tu pedido",
        icon: "info",
        showConfirmButton: false,
        timer: 2000
      });

      setTimeout(() => {
        Swal.fire({
          title: "¡Pedido confirmado!",
          html: `
            <div class="text-start">
              <p><strong>Total:</strong> $${displayTotal.toLocaleString()}</p>
              <p><strong>Productos:</strong> ${cartItems.length}</p>
              <p class="text-success mt-3"><i class="bi bi-truck"></i> Envío gratis a domicilio</p>
            </div>
          `,
          icon: "success",
          confirmButtonText: "Continuar"
        }).then(() => {
          clearCart();
        });
      }, 2000);

    } catch (error) {
      console.error("Error al procesar el pago:", error);
      Swal.fire({
        title: "Ocurrió un error",
        text: "No se pudo procesar el pago. Intente nuevamente en unos minutos.",
        icon: "error",
      });
    }
  };

  const handleBuy = async () => {
    // Verificar stock antes de comprar
    const productosSinStock = cartItems.filter(
      (item) => item.quantity > (item.stock || 10)
    );

    if (productosSinStock.length > 0) {
      Swal.fire({
        title: "Stock insuficiente",
        html: `
          <div class="text-start">
            <p>Los siguientes productos no tienen stock suficiente:</p>
            <ul>
              ${productosSinStock.map(item => 
                `<li><strong>${item.title}</strong> (Stock: ${item.stock || 0})</li>`
              ).join('')}
            </ul>
          </div>
        `,
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    Swal.fire({
      title: "¿Confirmar compra?",
      html: `
        <div class="text-start">
          <p><strong>Total a pagar:</strong> $${displayTotal.toLocaleString()}</p>
          <p><strong>Productos:</strong> ${cartItems.length}</p>
          <p class="text-success"><i class="bi bi-truck"></i> Envío gratis incluido</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Confirmar compra",
      cancelButtonText: "Seguir comprando"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setAnimationStage("entering");

          setTimeout(() => {
            setAnimationStage("exiting");
          }, 2000);

          setTimeout(() => {
            setAnimationStage("idle");
            handlePagar();
          }, 4000);
        } catch (error) {
          console.error("Error en la compra:", error);
          Swal.fire({
            title: "Error en la compra",
            text: "No se pudo procesar tu compra. Intenta nuevamente.",
            icon: "error",
          });
        }
      }
    });
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

  const getEspecieIcon = (categoria) => {
    switch (categoria) {
      case 'Alimentación': return 'bi-egg-fried';
      case 'Juguetes': return 'bi-stars';
      case 'Accesorios': return 'bi-gem';
      case 'Higiene': return 'bi-droplet';
      case 'Camas y Casas': return 'bi-house-door';
      case 'Transporte': return 'bi-truck';
      case 'Salud': return 'bi-capsule';
      case 'Ropa': return 'bi-person-badge';
      default: return 'bi-heart';
    }
  };

  return (
    <>
      <section className="carrito-section bg-light min-vh-100 py-4">
        <div className="container">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4 carrito-header">
            <NavLink
              to={"/"}
              className="btn btn-outline-primary d-flex align-items-center carrito-back-btn"
            >
              <i className="bi bi-chevron-left me-1"></i>
              Volver a la tienda
            </NavLink>
            
            <div className="text-center carrito-title">
              <h1 className="text-success mb-1">
                <i className="bi bi-cart3 me-2"></i>
                Carrito de Compras
              </h1>
              <small className="text-muted">VitalPet - Todo para tu mascota</small>
            </div>
            
            <div className="text-end carrito-security">
              <Badge bg="success" className="fs-6 carrito-badge">
                <i className="bi bi-shield-check me-1"></i>
                Pago seguro
              </Badge>
            </div>
          </div>

          <div className="row justify-content-center">
            {/* Lista de productos */}
            <div className="col-lg-8 col-12 mb-4 carrito-products">
              {cartItems.length === 0 ? (
                <Card className="text-center py-5 border-0 shadow-sm carrito-empty">
                  <Card.Body>
                    <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
                    <h4 className="text-muted mb-3">Tu carrito está vacío</h4>
                    <p className="text-muted mb-4">
                      Descubre productos increíbles para tu mascota
                    </p>
                    <NavLink to="/catalogo" className="btn btn-success btn-lg carrito-explore-btn">
                      <i className="bi bi-search me-2"></i>
                      Explorar productos
                    </NavLink>
                  </Card.Body>
                </Card>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3 carrito-products-header">
                    <h5 className="text-success mb-0">
                      <i className="bi bi-bag-check me-2"></i>
                      Tus productos ({cartItems.length})
                    </h5>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        Swal.fire({
                          title: "¿Vaciar carrito?",
                          text: "Se eliminarán todos los productos",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#dc3545",
                          cancelButtonColor: "#6c757d",
                          confirmButtonText: "Sí, vaciar",
                          cancelButtonText: "Cancelar"
                        }).then((result) => {
                          if (result.isConfirmed) {
                            clearCart();
                          }
                        });
                      }}
                      className="carrito-clear-btn"
                    >
                      <i className="bi bi-trash me-1"></i>
                      Vaciar carrito
                    </Button>
                  </div>

                  {cartItems.map((item, index) => (
                    <Card key={`${item._id || item.id}-${index}`} className="mb-3 shadow-sm border-0 carrito-product-card">
                      <Card.Body>
                        <div className="row align-items-center">
                          {/* Imagen */}
                          <div className="col-md-2 text-center carrito-product-image">
                            <Image
                              src={item.image || item.imagen}
                              rounded
                              className="img-fluid carrito-img"
                              alt={item.title}
                              onError={(e) => {
                                e.target.src = "https://images.pexels.com/photos/69071/pexels-photo-69071.jpeg";
                              }}
                            />
                          </div>

                          {/* Información del producto */}
                          <div className="col-md-4 carrito-product-info">
                            <h6 className="fw-bold mb-1 carrito-product-title">{item.title || item.nombre}</h6>
                            <div className="mb-2 carrito-product-badges">
                              <Badge bg={getBadgeCategoria(item.category)} className="me-1">
                                <i className={`bi ${getEspecieIcon(item.category)} me-1`}></i>
                                {item.category}
                              </Badge>
                              <Badge bg="outline-primary" text="dark">
                                {item.type || "Producto"}
                              </Badge>
                            </div>
                            <small className="text-muted carrito-product-description">
                              {item.description_breve || "Producto de calidad para tu mascota"}
                            </small>
                          </div>

                          {/* Cantidad */}
                          <div className="col-md-3 text-center carrito-product-quantity">
                            <div className="d-flex align-items-center justify-content-center carrito-quantity-controls">
                              <span className="me-2 text-muted">Cantidad:</span>
                              <div className="btn-group btn-group-sm carrito-quantity-buttons">
                                <Button
                                  variant="outline-secondary"
                                  onClick={() => decreaseQuantity(item._id || item.id)}
                                  disabled={item.quantity <= 1}
                                  className="carrito-quantity-btn"
                                >
                                  -
                                </Button>
                                <span className="px-3 fw-bold carrito-quantity-value">{item.quantity}</span>
                                <Button
                                  variant="outline-secondary"
                                  onClick={() => increaseQuantity(item._id || item.id)}
                                  disabled={item.quantity >= (item.stock || 10)}
                                  className="carrito-quantity-btn"
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            
                            {item.stock !== undefined && item.quantity > item.stock && (
                              <Alert variant="danger" className="mt-2 py-1 mb-0 small carrito-stock-alert">
                                <i className="bi bi-exclamation-triangle me-1"></i>
                                Stock máximo: {item.stock}
                              </Alert>
                            )}
                          </div>

                          {/* Precio y acciones */}
                          <div className="col-md-3 text-center carrito-product-actions">
                            <div className="mb-2 carrito-product-price">
                              <h5 className="text-success mb-0 carrito-price-total">
                                ${((item.price || item.precio) * item.quantity).toLocaleString()}
                              </h5>
                              <small className="text-muted carrito-price-unit">
                                ${(item.price || item.precio).toLocaleString()} c/u
                              </small>
                            </div>
                            
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeFromCart(item._id || item.id)}
                              title="Eliminar producto"
                              className="carrito-remove-btn"
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </>
              )}
            </div>

            {/* Resumen de compra */}
            {cartItems.length > 0 && (
              <div className="col-lg-4 col-12 carrito-summary">
                <Card className="shadow-lg border-0 sticky-top carrito-summary-card">
                  <Card.Header className="bg-success text-white carrito-summary-header">
                    <h5 className="mb-0">
                      <i className="bi bi-receipt me-2"></i>
                      Resumen de Compra
                    </h5>
                  </Card.Header>
                  <Card.Body className="carrito-summary-body">
                    <div className="mb-3 carrito-summary-details">
                      <div className="d-flex justify-content-between mb-2 carrito-summary-item">
                        <span>Subtotal:</span>
                        <span>${displayTotal.toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2 carrito-summary-item">
                        <span>Envío:</span>
                        <Badge bg="success" className="carrito-shipping-badge">Gratis</Badge>
                      </div>
                      <div className="d-flex justify-content-between mb-2 carrito-summary-item">
                        <span>Descuento:</span>
                        <span className="text-success">-$0</span>
                      </div>
                      <hr className="carrito-summary-divider" />
                      <div className="d-flex justify-content-between fs-5 fw-bold text-success carrito-summary-total">
                        <span>Total:</span>
                        <span>${displayTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <Alert variant="info" className="small carrito-info-alert">
                      <i className="bi bi-info-circle me-2"></i>
                      Envío gratis en compras mayores a $0
                    </Alert>

                    <Button
                      variant="success"
                      size="lg"
                      className="w-100 mb-2 carrito-pay-btn"
                      onClick={handleBuy}
                    >
                      <i className="bi bi-credit-card me-2"></i>
                      Proceder al pago
                    </Button>
                    
                    <NavLink to="/catalogo" className="btn btn-outline-primary w-100 carrito-continue-btn">
                      <i className="bi bi-arrow-left me-2"></i>
                      Seguir comprando
                    </NavLink>
                  </Card.Body>
                </Card>
              </div>
            )}
          </div>

          {/* Animación de compra */}
          {animationStage !== "idle" && (
            <div className={`carrito-overlay ${animationStage}`}>
              <div className="carrito-animation">
                <div className="carrito-animation-icon">🐕</div>
                <p className="carrito-animation-text">Procesando tu pedido...</p>
              </div>
            </div>
          )}
        </div>
        
        <WhatsAppButton />
      </section>
    </>
  );
};

export default Carrito;