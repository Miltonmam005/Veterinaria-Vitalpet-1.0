import { Accordion, Table, Button, Form, Modal } from "react-bootstrap";
import ItemProducto from "./componentsAdministrador/ItemProducto";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { leerProductosPaginados, crearProducto } from "../../helpers/queries.js";
import Swal from "sweetalert2";

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
      <section className="py-3 bg-success text-light">
        <h3 className="text-center text-uppercase">
          <i className="bi bi-heart-pulse me-2"></i>
          Panel Administrativo - VitalPet
        </h3>
      </section>
      
      <section className="container my-4">
        {/* PRODUCTOS VETERINARIOS */}
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header ref={headerProductosRef}>
              <i className="bi bi-capsule me-2"></i>
              Productos y Servicios Veterinarios
            </Accordion.Header>
            <Accordion.Body>
              {/* BARRA DE BÚSQUEDA Y BOTONES */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form className="d-flex w-50 position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Buscar productos o servicios..."
                    onChange={handleChangeProducto}
                    value={terminoBusquedaProducto}
                  />
                  {terminoBusquedaProducto && (
                    <Button
                      variant="link"
                      className="position-absolute end-0 top-50 translate-middle-y"
                      onClick={limpiarBusquedaProducto}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  )}
                </Form>
                
                <div className="d-flex gap-2">
                  <Button variant="success" href="/administrador/crear">
                    <i className="bi bi-plus-circle me-1"></i>
                    Agregar Producto
                  </Button>
                  <Button variant="primary" onClick={handleShow}>
                    <i className="bi bi-lightning me-1"></i>
                    Crear Rápido
                  </Button>
                </div>
              </div>

              {/* TABLA DE PRODUCTOS */}
              <Table responsive striped bordered hover>
                <thead className="table-success">
                  <tr className="text-center">
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Destacado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingProductos ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        <div className="spinner-border text-success" role="status">
                          <span className="visually-hidden">Cargando...</span>
                        </div>
                      </td>
                    </tr>
                  ) : productos && productos.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">
                        <i className="bi bi-inbox me-2"></i>
                        No hay productos registrados
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
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <Button
                    variant="outline-success"
                    onClick={() => setPageProducto(prev => Math.max(prev - 1, 1))}
                    disabled={pageProducto === 1}
                  >
                    <i className="bi bi-chevron-left"></i> Anterior
                  </Button>
                  <span className="mx-3">
                    Página <strong>{pageProducto}</strong> de <strong>{totalPagesProducto}</strong>
                  </span>
                  <Button
                    variant="outline-success"
                    onClick={() => setPageProducto(prev => Math.min(prev + 1, totalPagesProducto))}
                    disabled={pageProducto === totalPagesProducto}
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>
            <i className="bi bi-plus-circle me-2"></i>
            Crear Producto Rápido
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Vacuna Triple Felina"
                {...register("nombre", {
                  required: "El nombre es obligatorio"
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio *</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Ej: 2500"
                {...register("precio", {
                  required: "El precio es obligatorio"
                })}
              />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="success" type="submit">
                <i className="bi bi-check-circle me-1"></i>
                Crear
              </Button>
              <Button variant="secondary" onClick={handleClose}>
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