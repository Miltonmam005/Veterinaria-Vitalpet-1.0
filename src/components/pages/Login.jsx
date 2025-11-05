import { useForm } from "react-hook-form";
import { Container, Row, Col, Button, Form } from "react-bootstrap"; 
import Swal from "sweetalert2";
import icono from "../img/icono-veterinaria.png"; 
import { Link, useNavigate } from "react-router";
import { login } from "../../helpers/queries";

const Login = ({ setUsuarioAdmin }) => { 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navegacion = useNavigate();

  const iniciarSesion = async (usuario) => {
    try {
      const respuesta = await login(usuario);
      if (respuesta.status === 200) {
        const datosUsuario = await respuesta.json();
        setUsuarioAdmin({
          nombreUsuario: datosUsuario.nombreUsuario,
          token: datosUsuario.token,
        });
        Swal.fire(
          "Bienvenido",
          `Hola ${datosUsuario.nombreUsuario}`,
          "success"
        );
        navegacion("/administrador");
      } else {
        Swal.fire({
          title: "Error al iniciar sesion",
          text: `Credenciales incorrectas`,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error en login:", error);
      Swal.fire("Error", "Ocurrió un error inesperado", "error");
    }
  };

  return (
    <div className="login-wrapper">
      <Container fluid className="login-container">
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
              <h2 className="login-title text-center">Inicia Sesión</h2>
              <Form onSubmit={handleSubmit(iniciarSesion)}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Correo electrónico *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ej: mail@gmail.com"
                    className={`input-field ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value:
                          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                        message:
                          "El email debe tener un formato valido, por ej: pedro@gmail.com",
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
                    placeholder="ej: Pass1234*"
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
                <Button
                  type="submit"
                  className="w-100 login-button fw-semibold py-2 mb-3"
                >
                  Ingresar
                </Button>
                <div className="login-links">
                  <p className="mb-1 text-muted  text-center"></p>
                  <Button
                    variant="link"
                    className="p-0 m-0 text-success text-decoration-none d-flex  justify-content-center"
                    as={Link}
                    to="/error404"
                  >
                    ¿Olvidaste tu contraseña?
                  </Button>
                </div>
                <div className="login-links mt-3 d-flex justify-content-center align-items-center gap-1">
                  <span className="text-muted small">¿No tienes cuenta?</span>
                  <Button
                    variant="link"
                    className="p-0 text-success fw-bold text-decoration-none"
                    as={Link}
                    to="/registro"
                  >
                    Registrarse
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

export default Login;