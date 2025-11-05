import { Accordion, Table, Button, Form, Modal, Spinner } from "react-bootstrap";
import ItemProducto from "./componentsAdministrador/ItemProductos.jsx";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { leerProductosPaginados, crearProducto } from "../../helpers/queries.js";
import Swal from "sweetalert2";
import "../Styles/Administrador.css";

const Administrador = ({ 
  productos, 
  setProductos, 
  borrarProducto, 
  destacarProducto 
}) => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("userKey")) || {};
  
  const [show, setShow] = useState(false);
  const [pageProducto, setPageProducto] = useState(1);
  const [limitProducto] = useState(10);
  const [totalPagesProducto, setTotalPagesProducto] = useState(1);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [terminoBusquedaProducto, setTerminoBusquedaProducto] = useState("");

  const headerProductosRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    leerProductos();
  }, [pageProducto, terminoBusquedaProducto]);

  const leerProductos = async () => {
    setLoadingProductos(true);
    const respuesta = await leerProductosPaginados(
      pageProducto,
      limitProducto,
      terminoBusquedaProducto
    );
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setProductos(datos.productos);
      setTotalPagesProducto(datos.totalPages);
      
      if (pageProducto > 1) {
        setTimeout(() => {
          headerProductosRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    } else {
      console.info("Error al cargar los productos");
    }
    setLoadingProductos(false);
  };

  const onSubmit = async (producto) => {
    const respuesta = await crearProducto(producto);
    if (respuesta.status === 201) {
      Swal.fire({
        title: "Producto creado!",
        text: `El producto ${producto.nombre} fue creado exitosamente`,
        icon: "success",
      });
      reset();
      leerProductos();
      handleClose();
    } else {
      Swal.fire({
        title: "Ocurrió un problema",
        text: `No pudimos crear el producto ${producto.nombre}`,
        icon: "error",
      });
    }
  };

  const handleChangeProducto = (e) => {
    setTerminoBusquedaProducto(e.target.value);
    setPageProducto(1);
  };

  const limpiarBusquedaProducto = () => {
    setTerminoBusquedaProducto("");
    setPageProducto(1);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <section className="admin-header py-3 bg-success text-light">
        <div className="container">
          <h3 className="text-center text-uppercase mb-0">
            <i className="bi bi-heart-pulse me-2"></i>
            Panel Administrativo - VitalPet
          </h3>
        </div>
      </section>
      
      <section className="container my-4 admin-container">
        {/* PRODUCTOS VETERINARIOS */}
        <Accordion defaultActiveKey="0" className="admin-accordion">
          <Accordion.Item eventKey="0" className="admin-accordion-item">
            <Accordion.Header ref={headerProductosRef} className="admin-accordion-header">
              <i className="bi bi-capsule me-2"></i>
              Productos y Servicios Veterinarios
            </Accordion.Header>
            <Accordion.Body className="admin-accordion-body">
              {/* BARRA DE BÚSQUEDA Y BOTONES */}
              <div className="d-flex justify-content-between align-items-center mb-4 admin-toolbar">
                <Form className="d-flex admin-search-form position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Buscar productos o servicios..."
                    onChange={handleChangeProducto}
                    value={terminoBusquedaProducto}
                    className="admin-search-input"
                  />
                  {terminoBusquedaProducto && (
                    <Button
                      variant="link"
                      className="position-absolute end-0 top-50 translate-middle-y admin-clear-search"
                      onClick={limpiarBusquedaProducto}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  )}
                </Form>
                
                <div className="d-flex gap-2 admin-action-buttons">
                  <Button variant="success" href="/administrador/crear" className="admin-add-btn">
                    <i className="bi bi-plus-circle me-1"></i>
                    Agregar Producto
                  </Button>
                  <Button variant="primary" onClick={handleShow} className="admin-quick-add-btn">
                    <i className="bi bi-lightning me-1"></i>
                    Crear Rápido
                  </Button>
                </div>
              </div>

              {/* TABLA DE PRODUCTOS */}
              <Table responsive striped bordered hover className="admin-table">
                <thead className="table-success admin-table-header">
                  <tr className="text-center">
                    <th className="admin-th-number">#</th>
                    <th className="admin-th-name">Nombre</th>
                    <th className="admin-th-type">Tipo</th>
                    <th className="admin-th-category">Categoría</th>
                    <th className="admin-th-price">Precio</th>
                    <th className="admin-th-stock">Stock</th>
                    <th className="admin-th-featured">Destacado</th>
                    <th className="admin-th-actions">Acciones</th>
                  </tr>
                </thead>
                <tbody className="admin-table-body">
                  {loadingProductos ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 admin-loading-cell">
                        <Spinner animation="border" variant="success" className="admin-spinner" />
                        <span className="visually-hidden">Cargando productos...</span>
                      </td>
                    </tr>
                  ) : productos && productos.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted admin-empty-cell">
                        <i className="bi bi-inbox me-2"></i>
                        {terminoBusquedaProducto ? "No se encontraron productos" : "No hay productos registrados"}
                      </td>
                    </tr>
                  ) : (
                    productos.map((producto, indice) => (
                      <ItemProducto
                        key={producto._id || producto.id}
                        producto={producto}
                        fila={(pageProducto - 1) * limitProducto + indice + 1}
                        borrarProducto={borrarProducto}
                        destacarProducto={destacarProducto}
                      />
                    ))
                  )}
                </tbody>
              </Table>

              {/* PAGINACIÓN */}
              {productos && productos.length > 0 && (
                <div className="d-flex justify-content-center align-items-center mt-4 admin-pagination">
                  <Button
                    variant="outline-success"
                    onClick={() => setPageProducto(prev => Math.max(prev - 1, 1))}
                    disabled={pageProducto === 1}
                    className="admin-pagination-btn"
                  >
                    <i className="bi bi-chevron-left"></i> Anterior
                  </Button>
                  <span className="mx-3 admin-pagination-info">
                    Página <strong>{pageProducto}</strong> de <strong>{totalPagesProducto}</strong>
                  </span>
                  <Button
                    variant="outline-success"
                    onClick={() => setPageProducto(prev => Math.min(prev + 1, totalPagesProducto))}
                    disabled={pageProducto === totalPagesProducto}
                    className="admin-pagination-btn"
                  >
                    Siguiente <i className="bi bi-chevron-right"></i>
                  </Button>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>

      {/* MODAL PARA CREACIÓN RÁPIDA */}
      <Modal show={show} onHide={handleClose} className="admin-modal">
        <Modal.Header closeButton className="bg-success text-white admin-modal-header">
          <Modal.Title className="admin-modal-title">
            <i className="bi bi-plus-circle me-2"></i>
            Crear Producto Rápido
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="admin-modal-body">
          <Form onSubmit={handleSubmit(onSubmit)} className="admin-modal-form">
            <Form.Group className="mb-3 admin-form-group">
              <Form.Label className="admin-form-label">Nombre del Producto *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Vacuna Triple Felina"
                {...register("nombre", {
                  required: "El nombre es obligatorio"
                })}
                className="admin-form-control"
                isInvalid={errors.nombre}
              />
              <Form.Control.Feedback type="invalid" className="admin-form-feedback">
                {errors.nombre?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 admin-form-group">
              <Form.Label className="admin-form-label">Precio *</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Ej: 2500"
                {...register("precio", {
                  required: "El precio es obligatorio"
                })}
                className="admin-form-control"
                isInvalid={errors.precio}
              />
              <Form.Control.Feedback type="invalid" className="admin-form-feedback">
                {errors.precio?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex gap-2 admin-modal-actions">
              <Button variant="success" type="submit" className="admin-modal-submit">
                <i className="bi bi-check-circle me-1"></i>
                Crear
              </Button>
              <Button variant="secondary" onClick={handleClose} className="admin-modal-cancel">
                Cancelar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Administrador;