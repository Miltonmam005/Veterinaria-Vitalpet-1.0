import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AdministrarTurnos = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <section className="container">
        <div className="d-flex justify-content-between align-items-center mt-5">
          <h1 className="display-4">Turnos</h1>
          <div>
            <Button variant="primary" onClick={handleShow}>
              <i className="bi bi-file-earmark-arrow-up"></i>
            </Button>
          </div>
        </div>
        <div className="my-4 table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr className="text-center">
                <th>Detalle de cita</th>
                <th>Veterinario</th>
                <th>Mascota</th>
                <th>Síntomas</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan Gutierrez</td>
                <td>Laura Torres</td>
                <td>Alonso</td>

                <td>Gripe</td>
                <td>15/10/25</td>
                <td>17:30</td>
                <td>
                  <div className="d-flex justify-content-center gap-1">
                    <button className="btn btn-warning">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDetalleCita">
              <Form.Label>Detalle de cita</Form.Label>
              <Form.Control
                type="text"
                placeholder="Jose Quipildor"
                required
                maxLength={100}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formVeterinario">
              <Form.Label>Veterinario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Martin Gomez"
                required
                maxLength={70}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMascota">
              <Form.Label>Mascota</Form.Label>
              <Form.Control
                type="text"
                placeholder="Rocky"
                required
                maxLength={70}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSintomas">
              <Form.Label>Síntomas</Form.Label>
              <Form.Control
                type="text"
                placeholder="diarrea"
                required
                maxLength={150}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHora">
              <Form.Label>Hora</Form.Label>
              <Form.Control type="time" required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdministrarTurnos;
