import React from "react";
import { useState, useEffect, useRef } from "react";
import { Accordion, Table, Button, Modal, Form, Badge } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AdministrarTurnos = () => {
  const [show, setShow] = useState(false);
  const [turnos, setTurnos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [editandoTurno, setEditandoTurno] = useState(null);

  const headerRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm();


  const turnosEjemplo = [
    {
      id: 1,
      duenio: "Juan Gutierrez",
      veterinario: "Dra. Laura Torres",
      mascota: "Alonso",
      especie: "Perro",
      raza: "Labrador",
      sintomas: "Fiebre y decaimiento",
      fecha: "2024-12-15",
      hora: "17:30",
      estado: "confirmado"
    },
    {
      id: 2,
      duenio: "María López",
      veterinario: "Dr. Pablo Sanchez",
      mascota: "Mimi",
      especie: "Gato",
      raza: "Siamés",
      sintomas: "Control anual y vacunación",
      fecha: "2024-12-16",
      hora: "10:00",
      estado: "pendiente"
    },
    {
      id: 3,
      duenio: "Carlos Díaz",
      veterinario: "Dr. Martín Gómez",
      mascota: "Max",
      especie: "Perro",
      raza: "Bulldog Francés",
      sintomas: "Problemas dermatológicos",
      fecha: "2024-12-14",
      hora: "16:00",
      estado: "completado"
    }
  ];

  useEffect(() => {
    leerTurnos();
  }, [page, terminoBusqueda]);

  const leerTurnos = async () => {
    setLoading(true);
    setTimeout(() => {
      let turnosFiltrados = turnosEjemplo;
      
      if (terminoBusqueda) {
        turnosFiltrados = turnosEjemplo.filter(turno => 
          turno.duenio.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
          turno.mascota.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
          turno.veterinario.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );
      }
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const turnosPaginados = turnosFiltrados.slice(startIndex, endIndex);
      
      setTurnos(turnosPaginados);
      setTotalPages(Math.ceil(turnosFiltrados.length / limit));
      setLoading(false);

      if (page > 1) {
        setTimeout(() => {
          headerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }, 500);
  };

  const handleClose = () => {
    setShow(false);
    setEditandoTurno(null);
    reset();
  };

  const handleShow = () => {
    setShow(true);
    setEditandoTurno(null);
  };

  const onSubmit = (data) => {
    if (editandoTurno) {
      Swal.fire({
        title: "Turno actualizado",
        text: `El turno de ${data.mascota} fue actualizado correctamente`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Turno creado",
        text: `El turno para ${data.mascota} fue agendado correctamente`,
        icon: "success",
      });
    }
    handleClose();
    leerTurnos();
  };

  const editarTurno = (turno) => {
    setEditandoTurno(turno);
    setValue("duenio", turno.duenio);
    setValue("veterinario", turno.veterinario);
    setValue("mascota", turno.mascota);
    setValue("especie", turno.especie);
    setValue("raza", turno.raza);
    setValue("sintomas", turno.sintomas);
    setValue("fecha", turno.fecha);
    setValue("hora", turno.hora);
    setValue("estado", turno.estado);
    setShow(true);
  };

  const eliminarTurno = (turno) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a eliminar el turno de ${turno.mascota}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "El turno ha sido eliminado.", "success");
        leerTurnos();
      }
    });
  };

  const cambiarEstadoTurno = (turno, nuevoEstado) => {
    Swal.fire({
      title: "Cambiar estado",
      text: `¿Cambiar estado a ${nuevoEstado}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Actualizado!", "El estado del turno ha sido cambiado.", "success");
        leerTurnos();
      }
    });
  };

  const handleChangeBusqueda = (e) => {
    setTerminoBusqueda(e.target.value);
    setPage(1);
  };

  const limpiarBusqueda = () => {
    setTerminoBusqueda("");
    setPage(1);
  };

  const getBadgeVariant = (estado) => {
    switch (estado) {
      case "confirmado": return "success";
      case "pendiente": return "warning";
      case "completado": return "primary";
      case "cancelado": return "danger";
      default: return "secondary";
    }
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  return (
    <>
      <section className="py-3 bg-primary text-light">
        <h3 className="text-center text-uppercase">
          <i className="bi bi-calendar-check me-2"></i>
          Gestión de Turnos - VitalPet
        </h3>
      </section>

      <section className="container my-4">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header ref={headerRef}>
              <i className="bi bi-clock-history me-2"></i>
              Turnos Programados
            </Accordion.Header>
            <Accordion.Body>
              {/* BARRA DE BÚSQUEDA Y BOTONES */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form className="d-flex w-50 position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Buscar por dueño, mascota o veterinario..."
                    onChange={handleChangeBusqueda}
                    value={terminoBusqueda}
                  />
                  {terminoBusqueda && (
                    <Button
                      variant="link"
                      className="position-absolute end-0 top-50 translate-middle-y"
                      onClick={limpiarBusqueda}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  )}
                </Form>
                
                <Button variant="success" onClick={handleShow}>
                  <i className="bi bi-plus-circle me-1"></i>
                  Nuevo Turno
                </Button>
              </div>

              {/* TABLA DE TURNOS */}
              <Table responsive striped bordered hover>
                <thead className="table-primary">
                  <tr className="text-center">
                    <th>#</th>
                    <th>Dueño</th>
                    <th>Veterinario</th>
                    <th>Mascota</th>
                    <th>Especie/Raza</th>
                    <th>Síntomas</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="10" className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Cargando turnos...</span>
                        </div>
                      </td>
                    </tr>
                  ) : turnos.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center py-4 text-muted">
                        <i className="bi bi-calendar-x me-2"></i>
                        {terminoBusqueda ? "No se encontraron turnos" : "No hay turnos programados"}
                      </td>
                    </tr>
                  ) : (
                    turnos.map((turno, indice) => (
                      <tr key={turno.id} className="text-center">
                        <td>{(page - 1) * limit + indice + 1}</td>
                        <td className="fw-bold">{turno.duenio}</td>
                        <td>{turno.veterinario}</td>
                        <td>
                          <strong>{turno.mascota}</strong>
                        </td>
                        <td>
                          <small>
                            {turno.especie}<br/>
                            <span className="text-muted">{turno.raza}</span>
                          </small>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark">
                            {turno.sintomas}
                          </span>
                        </td>
                        <td>
                          <strong>{formatFecha(turno.fecha)}</strong>
                        </td>
                        <td>
                          <Badge bg="outline-primary" text="dark">
                            {turno.hora}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={getBadgeVariant(turno.estado)}>
                            {turno.estado}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-1">
                            <Button
                              variant="outline-warning"
                              size="sm"
                              onClick={() => editarTurno(turno)}
                              title="Editar turno"
                            >
                              <i className="bi bi-pencil"></i>
                            </Button>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => cambiarEstadoTurno(turno, "completado")}
                              title="Marcar como completado"
                            >
                              <i className="bi bi-check-lg"></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => eliminarTurno(turno)}
                              title="Eliminar turno"
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>

              {/* PAGINACIÓN */}
              {turnos.length > 0 && (
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <Button
                    variant="outline-primary"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  >
                    <i className="bi bi-chevron-left"></i> Anterior
                  </Button>
                  <span className="mx-3">
                    Página <strong>{page}</strong> de <strong>{totalPages}</strong>
                  </span>
                  <Button
                    variant="outline-primary"
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                  >
                    Siguiente <i className="bi bi-chevron-right"></i>
                  </Button>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>

      {/* MODAL PARA AGREGAR/EDITAR TURNO */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="bi bi-calendar-plus me-2"></i>
            {editandoTurno ? "Editar Turno" : "Agendar Nuevo Turno"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Dueño de la Mascota *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    {...register("duenio", {
                      required: "El nombre del dueño es obligatorio",
                      minLength: {
                        value: 2,
                        message: "Debe tener al menos 2 caracteres"
                      }
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.duenio?.message}
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Veterinario *</Form.Label>
                  <Form.Select
                    {...register("veterinario", {
                      required: "Seleccione un veterinario"
                    })}
                  >
                    <option value="">Seleccionar veterinario...</option>
                    <option value="Dra. Laura Torres">Dra. Laura Torres</option>
                    <option value="Dr. Pablo Sanchez">Dr. Pablo Sanchez</option>
                    <option value="Dr. Martín Gómez">Dr. Martín Gómez</option>
                  </Form.Select>
                  <Form.Text className="text-danger">
                    {errors.veterinario?.message}
                  </Form.Text>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la Mascota *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Toby"
                    {...register("mascota", {
                      required: "El nombre de la mascota es obligatorio"
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.mascota?.message}
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Especie *</Form.Label>
                  <Form.Select
                    {...register("especie", {
                      required: "Seleccione la especie"
                    })}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Ave">Ave</option>
                    <option value="Roedor">Roedor</option>
                    <option value="Reptil">Reptil</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Raza</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Labrador"
                    {...register("raza")}
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Síntomas o Motivo de la Consulta *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describa los síntomas o el motivo de la consulta..."
                {...register("sintomas", {
                  required: "Los síntomas son obligatorios",
                  minLength: {
                    value: 5,
                    message: "Describa al menos 5 caracteres"
                  }
                })}
              />
              <Form.Text className="text-danger">
                {errors.sintomas?.message}
              </Form.Text>
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Fecha *</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("fecha", {
                      required: "La fecha es obligatoria"
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.fecha?.message}
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Hora *</Form.Label>
                  <Form.Control
                    type="time"
                    {...register("hora", {
                      required: "La hora es obligatoria"
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.hora?.message}
                  </Form.Text>
                </Form.Group>
              </div>
            </div>

            {editandoTurno && (
              <Form.Group className="mb-3">
                <Form.Label>Estado del Turno</Form.Label>
                <Form.Select {...register("estado")}>
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="completado">Completado</option>
                  <option value="cancelado">Cancelado</option>
                </Form.Select>
              </Form.Group>
            )}

            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                <i className="bi bi-calendar-check me-1"></i>
                {editandoTurno ? "Actualizar Turno" : "Agendar Turno"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdministrarTurnos;