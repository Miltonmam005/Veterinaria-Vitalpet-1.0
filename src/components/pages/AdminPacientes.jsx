import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
 
const AdministrarPacientes = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

return (
    <>
      <section className="container">
        <div className="d-flex justify-content-between align-items-center mt-5">
          <h1 className="display-4">Pacientes</h1>
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
                <th>Nombre y Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Nombre de la mascota</th>
                <th>Especie</th>
                <th>Raza</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan Gutierrez</td>
                <td>juangutti4@gmail.com</td>
                <td>+1(825)603-6625</td>
                <td>Country Jockey Club</td>
                <td>Alonso</td>
                <td>Perro</td>
                <td>Saluki</td>
    
    
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
          <Modal.Title>Agregar Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formNombreDueño">
              <Form.Label>Nombre y Apellido *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Jose Quipildor"
                required
                maxLength={70}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                placeholder="josequipildor90@hotmail.com"
                required
                maxLength={150}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTelefono">
              <Form.Label>Teléfono *</Form.Label>
              <Form.Control
                type="tel"
                placeholder="+54 381 123-4567"
                required
                maxLength={20}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDireccion">
              <Form.Label>Dirección *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Av. Alem 2000"
                required
                maxLength={150}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNombreMascota">
              <Form.Label>Nombre de la Mascota *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Rocky"
                required
                maxLength={50}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEspecie">
              <Form.Label>Especie *</Form.Label>
              <Form.Select required>
                <option value="">Seleccionar especie</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="ave">Ave</option>
                <option value="roedor">Roedor</option>
                <option value="reptil">Reptil</option>
                <option value="otro">Otro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRaza">
              <Form.Label>Raza *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Saluki"
                required
                maxLength={50}
              />
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

export default AdministrarPacientes;
