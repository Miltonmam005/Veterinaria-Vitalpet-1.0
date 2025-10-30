import React from 'react';
import milton from "../assets/milton.jpg";

const SobreNosotros = () => {
    return (
    <>
      <h1 className="text-center mt-3">Acerca de nosotros</h1>
      <section className="container">
        <div className="row align-items-center">
          {/* Imagen */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://images.pexels.com/photos/7469229/pexels-photo-7469229.jpeg"
              alt="veterinaria vitalpet"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Texto */}
          <div className="col-md-6">
            <h4 className="fw-bold">Cuidando a tus mascotas desde 2005 🐾</h4>
            <p className="text-muted">
              En <strong>VitalPet</strong> creemos que cada mascota es parte de
              la familia. Nuestro equipo de veterinarios y especialistas ofrece
              atención médica de calidad, cariño y compromiso en cada consulta.
            </p>
            <p>
              Contamos con servicios de{" "}
              <em>
                consultas médicas, vacunación, cirugías, peluquería canina y
                guardería
              </em>
              . Además, ofrecemos productos seleccionados para la salud y el
              bienestar de tus animales.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="row text-center my-5">
          <div className="col-md-4">
            <div className="card shadow border-0 p-3 h-100">
              <i className="bi bi-heart-fill text-danger fs-1"></i>
              <h5 className="mt-3">Amor por las mascotas</h5>
              <p>Tratamos a cada paciente con cariño y dedicación.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 p-3 h-100">
              <i className="bi bi-shield-check text-success fs-1"></i>
              <h5 className="mt-3">Confianza</h5>
              <p>Profesionales certificados con experiencia comprobada.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 p-3 h-100">
              <i className="bi bi-emoji-smile text-primary fs-1"></i>
              <h5 className="mt-3">Compromiso</h5>
              <p>Tu mascota siempre en las mejores manos.</p>
            </div>
          </div>
        </div>

        {/* Integrantes */}
        <div className="row text-center d-flex justify-content-center mt-5">
          <h3 className="mb-4">Nuestros integrantes</h3>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body bg-body-secondary">
                <Image
                  src={benja}
                  className="w-100 mb-2 img-circular-sobreNosotros"
                  alt="Jose Benjamin Quiros"
                />
                <h2>Jose Benjamin Quiros</h2>
                <p className="card-text">
                  1. Página Principal: Diseño y desarrollo de la página
                  principal de la veterinaria, incluyendo la estructura y
                  contenido.
                  <br />
                  2. Páginas Informativas: Desarrollo de las páginas
                  informativas como "Acerca de Nosotros" y otras que sean
                  necesarias.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body bg-body-secondary">
                <Image
                  src={milton}
                  className="w-100 mb-2 img-circular-sobreNosotros"
                  alt="Milton Ramón Mamani"
                />
                <h2>Milton Ramón Mamani</h2>
                <p className="card-text">
                  1. Navbar y Footer: Diseño y desarrollo del navbar y footer
                  que se utilizarán en toda la página web.
                  <br />
                  2. Paginación: Implementación de la paginación para los
                  listados de pacientes, turnos, servicios, etc.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body bg-body-secondary">
                <Image
                  src={santiago}
                  className="w-100 mb-2 img-circular-sobreNosotros"
                  alt="Santiago Uriel Gonzalez"
                />
                <h2>Santiago Uriel Gonzalez</h2>
                <p className="card-text">
                  1. Administrar Pacientes: Desarrollo del CRUD (Crear, Leer,
                  Actualizar, Eliminar) de pacientes, incluyendo la gestión de
                  historiales médicos.
                  <br />
                  2. Administrar Turnos: Implementación del CRUD de turnos,
                  incluyendo la asignación de turnos a pacientes y veterinarios.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body bg-body-secondary">
                <Image
                  src={celina}
                  className="w-100 mb-2 img-circular-sobreNosotros"
                  alt="Celina Gabriela Acosta"
                />
                <h2>Celina Gabriela Acosta</h2>
                <p className="card-text">
                  1. Login y Registro de Usuarios: Desarrollo del sistema de
                  login y registro de usuarios, incluyendo la validación de
                  datos y seguridad.
                  <br />
                  2. Reserva de Turno: Implementación del sistema de reserva de
                  turnos para los usuarios.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body bg-body-secondary">
                <Image
                  src="https://w7.pngwing.com/pngs/753/432/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"
                  className="w-100 mb-2 img-circular-sobreNosotros"
                  alt="Tobias Conde"
                />
                <h2>Tobias Conde</h2>
                <p className="card-text">
                  1. Página Principal del Administrador: Diseño y desarrollo de
                  la página principal del administrador, incluyendo el dashboard
                  y estadísticas.
                  <br />
                  2. CRUD de Servicios: Desarrollo del CRUD de servicios
                  ofrecidos por la veterinaria, incluyendo la gestión de precios
                  y descripciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SobreNosotros;