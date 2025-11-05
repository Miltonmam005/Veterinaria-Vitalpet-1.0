import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router";
import "../Styles/register.css";
import icono from "../img/icono-veterinario.png";
import Swal from "sweetalert2";
import { crearUsuario } from "../../helpers/queries";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const crearCuenta = async (datos) => {
    try {
      const respuesta = await crearUsuario(datos);
      if (respuesta.status === 201) {
        Swal.fire({
          title: "¡Cuenta creada!",
          text: "Tu cuenta fue creada correctamente",
          icon: "success",
          confirmButtonColor: "#198754",
        });
        reset();
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo crear la cuenta",
          icon: "error",
          confirmButtonColor: "#dc3545",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al crear la cuenta",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div className="login-wrapper">
      <Container fluid className="register-container">
        <Row className="g-0">
          <Col
            md={6}
            className="left-side d-none d-md-flex justify-content-center align-items-center"
          >
            <img
              src={icono}
              alt="Mascota veterinaria"
              className="login-icono"
            />
          </Col>
          <Col
            xs={12}
            md={6}
            className="right-side d-flex align-items-center justify-content-center"
          >
            <div className="login-form w-100 px-4 px-md-5">
              <h2 className="login-title text-center mb-4 text-warning">
                Crear cuenta
              </h2>

              <Form onSubmit={handleSubmit(crearCuenta)}>
                <Form.Group className="mb-3" controlId="nombreUsuario">
                  <Form.Label>Nombre de usuario *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    className={`input-field ${
                      errors.nombreUsuario ? "is-invalid" : ""
                    }`}
                    {...register("nombreUsuario", {
                      required: "El nombre es obligatorio",
                      minLength: {
                        value: 2,
                        message: "Debe tener al menos 2 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "Debe tener menos de 50 caracteres",
                      },
                    })}
                  />
                  {errors.nombreUsuario && (
                    <Form.Text className="text-danger small">
                      {errors.nombreUsuario.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Correo electrónico *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ej: ejemplo@correo.com"
                    className={`input-field ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value:
                          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                        message: "Formato de email inválido",
                      },
                    })}
                  />
                  {errors.email && (
                    <Form.Text className="text-danger small">
                      {errors.email.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Contraseña *</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mínimo 8 caracteres, un digito y una mayúscula"
                    className={`input-field ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password", {
                      required: "La contraseña es obligatoria",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                        message:
                          "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.",
                      },
                    })}
                  />
                  {errors.password && (
                    <Form.Text className="text-danger small">
                      {errors.password.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmarPassword">
                  <Form.Label>Confirmar contraseña *</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Vuelve a escribir tu contraseña"
                    className={`input-field ${
                      errors.confirmarPassword ? "is-invalid" : ""
                    }`}
                    {...register("confirmarPassword", {
                      required: "Debes confirmar la contraseña",
                      validate: (value) =>
                        value === watch("password") ||
                        "Las contraseñas no coinciden",
                    })}
                  />
                  {errors.confirmarPassword && (
                    <Form.Text className="text-danger small">
                      {errors.confirmarPassword.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 btn-success fw-semibold py-2 mb-3"
                >
                  Registrarse
                </Button>
                <div className="login-links d-flex justify-content-center align-items-center gap-1">
                  <span className="text-muted small">¿Ya tienes cuenta?</span>
                  <Button
                    variant="link"
                    className="p-0 text-success fw-bold text-decoration-none"
                    as={Link}
                    to="/login"
                  >
                    Iniciar sesión
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
