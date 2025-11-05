import React from "react";
import { useState, useEffect, useRef } from "react";
import { Accordion, Table, Button, Modal, Form, Badge, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AdministrarPacientes = () => {
  const [show, setShow] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [editandoPaciente, setEditandoPaciente] = useState(null);
  const [vista, setVista] = useState("tabla"); 

  const headerRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch
  } = useForm();

  const pacientesEjemplo = [
    {
      id: 1,
      nombre: "Juan Gutierrez",
      email: "juangutti4@gmail.com",
      telefono: "+1(825)603-6625",
      direccion: "Country Jockey Club",
      mascota: "Alonso",
      especie: "Perro",
      raza: "Saluki",
      edadMascota: 3,
      peso: "28 kg",
      ultimaVisita: "2024-11-15",
      estado: "activo"
    },
    {
      id: 2,
      nombre: "María López",
      email: "maria.lopez@email.com",
      telefono: "+54 381 456-7890",
      direccion: "Av. San Martín 1234",
      mascota: "Mimi",
      especie: "Gato",
      raza: "Siamés",
      edadMascota: 2,
      peso: "4 kg",
      ultimaVisita: "2024-12-01",
      estado: "activo"
    },
    {
      id: 3,
      nombre: "Carlos Díaz",
      email: "carlos.diaz@email.com",
      telefono: "+54 381 555-6677",
      direccion: "Calle 25 de Mayo 567",
      mascota: "Max",
      especie: "Perro",
      raza: "Bulldog Francés",
      edadMascota: 4,
      peso: "12 kg",
      ultimaVisita: "2024-10-20",
      estado: "inactivo"
    },
    {
      id: 4,
      nombre: "Ana Torres",
      email: "ana.torres@email.com",
      telefono: "+54 381 777-8888",
      direccion: "Barrio Norte 789",
      mascota: "Luna",
      especie: "Gato",
      raza: "Persa",
      edadMascota: 1,
      peso: "3.5 kg",
      ultimaVisita: "2024-12-10",
      estado: "activo"
    }
  ];

  useEffect(() => {
    leerPacientes();
  }, [page, terminoBusqueda]);

  const leerPacientes = async () => {
    setLoading(true);
    setTimeout(() => {
      let pacientesFiltrados = pacientesEjemplo;
      
      if (terminoBusqueda) {
        pacientesFiltrados = pacientesEjemplo.filter(paciente => 
          paciente.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
          paciente.mascota.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
          paciente.email.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );
      }
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const pacientesPaginados = pacientesFiltrados.slice(startIndex, endIndex);
      
      setPacientes(pacientesPaginados);
      setTotalPages(Math.ceil(pacientesFiltrados.length / limit));
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
    setEditandoPaciente(null);
    reset();
  };

  const handleShow = () => {
    setShow(true);
    setEditandoPaciente(null);
  };

  const onSubmit = (data) => {
    if (editandoPaciente) {
      // Editar paciente existente
      Swal.fire({
        title: "Paciente actualizado",
        text: `Los datos de ${data.nombre} fueron actualizados correctamente`,
        icon: "success",
      });
    } else {
      // Crear nuevo paciente
      Swal.fire({
        title: "Paciente registrado",
        text: `El paciente ${data.nombre} fue registrado exitosamente`,
        icon: "success",
      });
    }
    handleClose();
    leerPacientes();
  };

  const editarPaciente = (paciente) => {
    setEditandoPaciente(paciente);
    setValue("nombre", paciente.nombre);
    setValue("email", paciente.email);
    setValue("telefono", paciente.telefono);
    setValue("direccion", paciente.direccion);
    setValue("mascota", paciente.mascota);
    setValue("especie", paciente.especie);
    setValue("raza", paciente.raza);
    setValue("edadMascota", paciente.edadMascota);
    setValue("peso", paciente.peso);
    setValue("estado", paciente.estado);
    setShow(true);
  };

  const eliminarPaciente = (paciente) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a eliminar al paciente ${paciente.nombre} y su mascota ${paciente.mascota}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "El paciente ha sido eliminado.", "success");
        leerPacientes();
      }
    });
  };

  const verHistorial = (paciente) => {
    Swal.fire({
      title: `Historial de ${paciente.mascota}`,
      html: `
        <div class="text-start">
          <p><strong>Dueño:</strong> ${paciente.nombre}</p>
          <p><strong>Mascota:</strong> ${paciente.mascota} (${paciente.especie})</p>
          <p><strong>Última visita:</strong> ${paciente.ultimaVisita}</p>
          <p><strong>Edad:</strong> ${paciente.edadMascota} años</p>
          <p><strong>Peso:</strong> ${paciente.peso}</p>
          <hr>
          <p class="text-muted">Aquí iría el historial médico completo...</p>
        </div>
      `,
      confirmButtonText: "Cerrar",
      width: 600
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
    return estado === "activo" ? "success" : "secondary";
  };

  const getEspecieIcon = (especie) => {
    switch (especie.toLowerCase()) {
      case "perro": return "bi bi-bug";
      case "gato": return "bi bi-stars";
      case "ave": return "bi bi-twitter";
      case "roedor": return "bi bi-circle";
      case "reptil": return "bi bi-droplet";
      default: return "bi bi-heart";
    }
  };

  const especieSeleccionada = watch("especie");

  return (
    <>
      <section className="py-3 bg-info text-light">
        <h3 className="text-center text-uppercase">
          <i className="bi bi-heart-pulse me-2"></i>
          Gestión de Pacientes - VitalPet
        </h3>
      </section>

      <section className="container my-4">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header ref={headerRef}>
              <i className="bi bi-person-heart me-2"></i>
              Registro de Pacientes
            </Accordion.Header>
            <Accordion.Body>
              {/* BARRA DE HERRAMIENTAS */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form className="d-flex w-50 position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Buscar por dueño, mascota o email..."
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
                
                <div className="d-flex gap-2">
                  <div className="btn-group">
                    <Button
                      variant={vista === "tabla" ? "primary" : "outline-primary"}
                      onClick={() => setVista("tabla")}
                      size="sm"
                    >
                      <i className="bi bi-table"></i>
                    </Button>
                    <Button
                      variant={vista === "tarjetas" ? "primary" : "outline-primary"}
                      onClick={() => setVista("tarjetas")}
                      size="sm"
                    >
                      <i className="bi bi-grid-3x3-gap"></i>
                    </Button>
                  </div>
                  <Button variant="success" onClick={handleShow}>
                    <i className="bi bi-person-plus me-1"></i>
                    Nuevo Paciente
                  </Button>
                </div>
              </div>

              {/* VISTA DE TABLA */}
              {vista === "tabla" && (
                <>
                  <Table responsive striped bordered hover>
                    <thead className="table-info">
                      <tr className="text-center">
                        <th>#</th>
                        <th>Dueño</th>
                        <th>Contacto</th>
                        <th>Dirección</th>
                        <th>Mascota</th>
                        <th>Especie/Raza</th>
                        <th>Edad/Peso</th>
                        <th>Última Visita</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="10" className="text-center py-4">
                            <div className="spinner-border text-info" role="status">
                              <span className="visually-hidden">Cargando pacientes...</span>
                            </div>
                          </td>
                        </tr>
                      ) : pacientes.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="text-center py-4 text-muted">
                            <i className="bi bi-person-x me-2"></i>
                            {terminoBusqueda ? "No se encontraron pacientes" : "No hay pacientes registrados"}
                          </td>
                        </tr>
                      ) : (
                        pacientes.map((paciente, indice) => (
                          <tr key={paciente.id} className="text-center align-middle">
                            <td className="fw-bold">{(page - 1) * limit + indice + 1}</td>
                            <td>
                              <strong>{paciente.nombre}</strong>
                            </td>
                            <td>
                              <div>
                                <small className="d-block">{paciente.email}</small>
                                <small className="text-muted">{paciente.telefono}</small>
                              </div>
                            </td>
                            <td>
                              <small>{paciente.direccion}</small>
                            </td>
                            <td>
                              <strong>{paciente.mascota}</strong>
                            </td>
                            <td>
                              <div>
                                <i className={`${getEspecieIcon(paciente.especie)} me-1`}></i>
                                {paciente.especie}
                                <br />
                                <small className="text-muted">{paciente.raza}</small>
                              </div>
                            </td>
                            <td>
                              <small>
                                {paciente.edadMascota} años<br />
                                <span className="text-muted">{paciente.peso}</span>
                              </small>
                            </td>
                            <td>
                              <Badge bg="outline-info" text="dark">
                                {paciente.ultimaVisita}
                              </Badge>
                            </td>
                            <td>
                              <Badge bg={getBadgeVariant(paciente.estado)}>
                                {paciente.estado}
                              </Badge>
                            </td>
                            <td>
                              <div className="d-flex justify-content-center gap-1">
                                <Button
                                  variant="outline-info"
                                  size="sm"
                                  onClick={() => verHistorial(paciente)}
                                  title="Ver historial"
                                >
                                  <i className="bi bi-clipboard-data"></i>
                                </Button>
                                <Button
                                  variant="outline-warning"
                                  size="sm"
                                  onClick={() => editarPaciente(paciente)}
                                  title="Editar paciente"
                                >
                                  <i className="bi bi-pencil"></i>
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => eliminarPaciente(paciente)}
                                  title="Eliminar paciente"
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
                </>
              )}

              {/* VISTA DE TARJETAS */}
              {vista === "tarjetas" && (
                <div className="row">
                  {loading ? (
                    <div className="col-12 text-center py-4">
                      <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Cargando pacientes...</span>
                      </div>
                    </div>
                  ) : pacientes.length === 0 ? (
                    <div className="col-12 text-center py-4 text-muted">
                      <i className="bi bi-person-x display-4"></i>
                      <p className="mt-2">
                        {terminoBusqueda ? "No se encontraron pacientes" : "No hay pacientes registrados"}
                      </p>
                    </div>
                  ) : (
                    pacientes.map((paciente) => (
                      <div key={paciente.id} className="col-md-6 col-lg-4 mb-3">
                        <Card className="h-100 shadow-sm">
                          <Card.Header className="bg-info text-white">
                            <div className="d-flex justify-content-between align-items-center">
                              <strong>{paciente.mascota}</strong>
                              <Badge bg={getBadgeVariant(paciente.estado)}>
                                {paciente.estado}
                              </Badge>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <div className="text-center mb-3">
                              <i className={`${getEspecieIcon(paciente.especie)} display-6 text-info`}></i>
                              <h6 className="mt-2">{paciente.especie} - {paciente.raza}</h6>
                            </div>
                            <p className="mb-1"><strong>Dueño:</strong> {paciente.nombre}</p>
                            <p className="mb-1"><strong>Email:</strong> {paciente.email}</p>
                            <p className="mb-1"><strong>Teléfono:</strong> {paciente.telefono}</p>
                            <p className="mb-1"><strong>Edad:</strong> {paciente.edadMascota} años</p>
                            <p className="mb-1"><strong>Peso:</strong> {paciente.peso}</p>
                            <p className="mb-0"><strong>Última visita:</strong> {paciente.ultimaVisita}</p>
                          </Card.Body>
                          <Card.Footer>
                            <div className="d-flex justify-content-between">
                              <Button
                                variant="outline-info"
                                size="sm"
                                onClick={() => verHistorial(paciente)}
                              >
                                <i className="bi bi-clipboard-data"></i>
                              </Button>
                              <Button
                                variant="outline-warning"
                                size="sm"
                                onClick={() => editarPaciente(paciente)}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => eliminarPaciente(paciente)}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </Card.Footer>
                        </Card>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* PAGINACIÓN */}
              {pacientes.length > 0 && (
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <Button
                    variant="outline-info"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  >
                    <i className="bi bi-chevron-left"></i> Anterior
                  </Button>
                  <span className="mx-3">
                    Página <strong>{page}</strong> de <strong>{totalPages}</strong>
                  </span>
                  <Button
                    variant="outline-info"
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

      {/* MODAL PARA AGREGAR/EDITAR PACIENTE */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="bg-info text-white">
          <Modal.Title>
            <i className="bi bi-person-plus me-2"></i>
            {editandoPaciente ? "Editar Paciente" : "Registrar Nuevo Paciente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h6 className="text-info mb-3">
              <i className="bi bi-person me-1"></i>
              Datos del Dueño
            </h6>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Nombre y Apellido *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    {...register("nombre", {
                      required: "El nombre completo es obligatorio",
                      minLength: {
                        value: 2,
                        message: "Debe tener al menos 2 caracteres"
                      }
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.nombre?.message}
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ej: juan@email.com"
                    {...register("email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Formato de email inválido"
                      }
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.email?.message}
                  </Form.Text>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono *</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Ej: +54 381 123-4567"
                    {...register("telefono", {
                      required: "El teléfono es obligatorio"
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.telefono?.message}
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Dirección *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Av. Siempre Viva 123"
                    {...register("direccion", {
                      required: "La dirección es obligatoria"
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.direccion?.message}
                  </Form.Text>
                </Form.Group>
              </div>
            </div>

            <hr />
            <h6 className="text-info mb-3">
              <i className="bi bi-heart me-1"></i>
              Datos de la Mascota
            </h6>

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
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Especie *</Form.Label>
                  <Form.Select
                    {...register("especie", {
                      required: "Seleccione la especie"
                    })}
                  >
                    <option value="">Seleccionar especie...</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Ave">Ave</option>
                    <option value="Roedor">Roedor</option>
                    <option value="Reptil">Reptil</option>
                    <option value="Otro">Otro</option>
                  </Form.Select>
                  <Form.Text className="text-danger">
                    {errors.especie?.message}
                  </Form.Text>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Raza *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Labrador, Siamés, etc."
                    {...register("raza", {
                      required: "La raza es obligatoria"
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.raza?.message}
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Edad (años)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="30"
                    placeholder="Ej: 3"
                    {...register("edadMascota")}
                  />
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Peso</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: 15 kg"
                    {...register("peso")}
                  />
                </Form.Group>
              </div>
            </div>

            {editandoPaciente && (
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select {...register("estado")}>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </Form.Select>
              </Form.Group>
            )}

            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="info" type="submit">
                <i className="bi bi-check-circle me-1"></i>
                {editandoPaciente ? "Actualizar Paciente" : "Registrar Paciente"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdministrarPacientes;