import { useEffect } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";


return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow">
            <Card.Header
              className={`${
                titulo === "Agregar Producto" ? "bg-success" : "bg-warning"
              } text-white`}
            >


              <h1 className="mb-0">{titulo}</h1>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre del Producto *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ej: Juguete para perro"
                        {...register("title", {
                          required: "El nombre es obligatorio",
                          minLength: {
                            value: 2,
                            message:
                              "El nombre debe tener al menos 2 caracteres",
                          },
                          maxLength: {
                            value: 100,
                            message:
                              "El nombre debe tener máximo 100 caracteres",
                          },
                        })}
                      />
                      <Form.Text className="text-danger">
                        {errors.title?.message}
                      </Form.Text>
                    </Form.Group>
                  </Col>



                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Precio *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ej: $5.600"
                        {...register("price", {
                          required: "El precio es obligatorio",
                          pattern: {
                            value: /^\$?[0-9]+(\.[0-9]{2})?$/,
                            message:
                              "Formato de precio inválido (ej: 5600 o $5.600)",
                          },
                        })}
                      />
                      <Form.Text className="text-danger">
                        {errors.price?.message}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>



                    <Form.Group className="mb-3">
                      <Form.Label>Categoría *</Form.Label>
                      <Form.Select
                        {...register("category", {
                          required: "La categoría es obligatoria",
                        })}
                      >
                        <option value="">Seleccione una categoría</option>
                        <option value="Juguetes">Juguetes</option>
                        <option value="Alimentación">Alimentación</option>
                        <option value="Accesorios">Accesorios</option>
                        <option value="Higiene">Higiene</option>
                        <option value="Camas y Casas">Camas y Casas</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Salud">Salud</option>
                        <option value="Ropa">Ropa</option>
                      </Form.Select>
                      <Form.Text className="text-danger">
                        {errors.category?.message}
                      </Form.Text>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">



                      <Form.Label>Tipo *</Form.Label>
                      <Form.Select
                        {...register("type", {
                          required: "El tipo es obligatorio",
                        })}
                      >
                        <option value="">Seleccione un tipo</option>
                        <option value="Producto">Producto</option>
                        <option value="Servicio">Servicio</option>
                      </Form.Select>
                      <Form.Text className="text-danger">
                        {errors.type?.message}



                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>URL de la Imagen *</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Ej: https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg"
                    {...register("image", {
                      required: "La URL de la imagen es obligatoria",
                      pattern: {
                        value:
                          /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)(\?.*)?$/,
                        message: "Debe ser una URL de imagen válida",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.image?.message}


                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Texto Alternativo *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Juguete de goma con forma de hueso para perro"
                    {...register("alt", {
                      required: "El texto alternativo es obligatorio",
                      minLength: {
                        value: 5,
                        message:
                          "El texto alternativo debe tener al menos 5 caracteres",
                      },
                      maxLength: {
                        value: 100,
                        message:
                          "El texto alternativo debe tener máximo 100 caracteres",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.alt?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción Breve *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ej: Juguete resistente de goma para perros de todas las razas."
                    {...register("description_breve", {
                      required: "La descripción breve es obligatoria",
                      minLength: {
                        value: 10,
                        message:
                          "La descripción breve debe tener al menos 10 caracteres",
                      },
                      maxLength: {
                        value: 200,
                        message:
                          "La descripción breve debe tener máximo 200 caracteres",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.description_breve?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción Amplia *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Ej: Diseñado para perros que aman masticar, este juguete de goma duradera ayuda a limpiar los dientes y fortalecer la mandíbula. Es perfecto para mantener a tu mascota entretenida y saludable."
                    {...register("description_amplia", {
                      required: "La descripción amplia es obligatoria",
                      minLength: {
                        value: 20,
                        message:
                          "La descripción amplia debe tener al menos 20 caracteres",
                      },
                      maxLength: {
                        value: 500,
                        message:
                          "La descripción amplia debe tener máximo 500 caracteres",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.description_amplia?.message}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    label="Producto destacado"
                    {...register("destacada")}
                  />
                  <Form.Text className="text-muted">
                    Los productos destacados aparecerán en la página principal
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4 d-flex gap-3">
                  <Button
                    variant={
                      titulo === "Agregar Producto" ? "success" : "warning"
                    }
                    type="submit"
                    size="lg"
                  >
                    {titulo === "Agregar Producto"
                      ? "Crear Producto"
                      : "Actualizar Producto"}
                  </Button>
                  <Link className="btn btn-danger btn-lg" to={"/administrador"}>
                    Cancelar
                  </Link>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioProducto;