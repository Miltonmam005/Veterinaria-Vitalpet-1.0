import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router";
import React from 'react';

const Inicio = () => {
  return (
    <>
      {/* HERO */}
      <header className="hero px-5 intercaloverde">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 text-center text-lg-start mb-3 mb-lg-0">
            <h1 className="text-light Titulosinicio TitulosinicioTamaño">
              Vital pet
            </h1>
            <p className="text-light">
              "Cuidamos a tus mascotas como parte de nuestra familia"
            </p>
            <Link to="/contact" className="btn btn-success me-2">
              Conocer nuestros planes
            </Link>
            <Link to="/contact" className="btn btn-warning">
              Agenda tu turno
            </Link>
          </div>
          <div className="col-12 col-lg-6 text-center">
            <img
              src="https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg"
              alt="Mascota"
              className="hero-img img-fluid mx-lg-5"
            />
          </div>
        </div>
      </header>

      {/* SERVICIOS */}
      <section className="py-5 text-center intercaloclaro">
        <h2 className="mb-4 text-warning">
          <span className="text-success">Nuestros Servicios</span> |
          Proporcionamos
        </h2>
        <div className="container">
          <div className="row">
            {[
              { icono: "bi-bandaid", texto: "Medicina General" },
              { icono: "bi-peace", texto: "Estética y Cuidado" },
              { icono: "bi-heart-pulse", texto: "Cirugía" },
              { icono: "bi-hospital", texto: "Emergencias" },
            ].map((serv, i) => (
              <div className="col-md-3 mb-3" key={i}>
                <div className="card h-100 text-white">
                  <div
                    className={`card-body ${
                      i % 2 === 0 ? "cardservicioverde" : "cardservicioamarillo"
                    } radius`}
                  >
                    <i className={`bi ${serv.icono} iconosServicio`}></i>
                    <h5>{serv.texto}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="py-5 intercaloverde">
        <div className="container">
          <h2>
            <span className="text-warning">Productos</span> | Tienda
          </h2>
          <div className="row mt-4 d-flex justify-content-center">
            <div className="row gy-4">
              {[
                {
                  img: "https://images.pexels.com/photos/28802855/pexels-photo-28802855.jpeg",
                  nombre: "Cucha para perro pequeña",
                  precio: "$5.600",
                  detalle: "Cucha para perros pequeños",
                },
                {
                  img: "https://images.pexels.com/photos/6035982/pexels-photo-6035982.jpeg",
                  nombre: "Comedero doble de acero",
                  precio: "$2.900",
                  detalle: "Comedero y bebedero antideslizante para mascotas",
                },
                {
                  img: "https://images.pexels.com/photos/27895178/pexels-photo-27895178.jpeg",
                  nombre: "Cucha para perro mediana",
                  precio: "$8.500",
                  detalle:
                    "Ideal para razas medianas, cómoda y resistente al agua",
                },
                {
                  img: "https://images.pexels.com/photos/20449895/pexels-photo-20449895.jpeg",
                  nombre: "Juguete mordedor",
                  precio: "$1.200",
                  detalle: "Hecho de caucho natural, ayuda a la salud dental",
                },
                {
                  img: "https://images.pexels.com/photos/10292639/pexels-photo-10292639.jpeg",
                  nombre: "Cama para gato",
                  precio: "$6.000",
                  detalle: "Suave, lavable y perfecta para el descanso felino",
                },
                {
                  img: "https://images.pexels.com/photos/9769849/pexels-photo-9769849.jpeg",
                  nombre: "Transportadora de mascotas",
                  precio: "$12.900",
                  detalle:
                    "Segura y ventilada, ideal para viajes o visitas al veterinario",
                },
              ].map((prod, i) => (
                <div
                  className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch"
                  key={i}
                >
                  <div className="cardservicioamarillo rounded p-2 m-3 d-flex flex-column w-100">
                    <Card.Img
                      variant="top"
                      src={prod.img}
                      alt={prod.nombre}
                      className="imgCardIndex"
                    />
                    <Card.Body className="flex-grow-1">
                      <h3>{prod.nombre}</h3>
                      <h2 className="Titulosinicio">{prod.precio}</h2>
                      <h5>{prod.detalle}</h5>
                    </Card.Body>
                    <Button variant="success" className="w-100 mt-auto">
                      Comprar
                    </Button>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-center">
                <Link to="/administrador" className="btn btn-success">
                  Ver más Productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARCAS */}
      <section className="py-4 text-center intercaloclaro">
        <h3>Marcas con las que trabajamos</h3>
        {[
          "https://1000logos.net/wp-content/uploads/2020/07/Royal-Canin-Logo.png",
          "https://1000logos.net/wp-content/uploads/2020/07/Purina-Logo.png",
          "https://1000logos.net/wp-content/uploads/2025/01/Petco-Logo.png",
          "https://1000logos.net/wp-content/uploads/2024/07/Sheba-Logo-500x281.png",
          "https://1000logos.net/wp-content/uploads/2023/03/Orkin-logo-500x281.png",
        ].map((url, i) => (
          <img
            src={url}
            key={i}
            alt="Logo de marca"
            className="mx-3"
            height={40}
          />
        ))}
      </section>

      {/* PLANES */}
      <section className="py-5 text-center intercaloverde">
        <h3 className="mb-3 Titulosinicio">
          Planes de <span className="text-warning">salud</span>
        </h3>
        <p className="mb-5">Escoja el mejor cuidado para tu mascota</p>

        <div className="container">
          <div className="row">
            {[
              {
                precio: "$20",
                nombre: "Primeros Pasos",
                detalle: "Para mascotas de 0 a 1 año",
                icono: "bi-emoji-smile",
              },
              {
                precio: "$25",
                nombre: "Madurando",
                detalle: "Para mascotas de 2 a 5 años",
                icono: "bi-heart-pulse",
              },
              {
                precio: "$30",
                nombre: "Adultos",
                detalle: "Para mascotas de 6 a 9 años",
                icono: "bi-shield-check",
              },
            ].map((plan, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div className="card border-0 shadow-lg h-100 p-4 rounded-4 position-relative overflow-hidden card-plan cardsgradienteverde">
                  <div className="mb-3">
                    <i className={`bi ${plan.icono} display-4`}></i>
                  </div>
                  <h4 className="fw-bold">{plan.nombre}</h4>
                  <h2 className="text-warning">
                    {plan.precio} <small className="text-light">/mes</small>
                  </h2>
                  <p className="mt-3">{plan.detalle}</p>
                  <Link
                    to={"/formularioplan"}
                    className="btn btn-light text-success fw-semibold mt-auto rounded-pill px-4 py-2"
                  >
                    Elegir plan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESIONALES */}
      <section className="py-5 text-center intercaloclaro">
        <h3 className="mb-4">Conozca al equipo que cuidará de sus mascotas</h3>
        <div className="container">
          <div className="row justify-content-center">
            {[
              {
                nombre: "Dr. Pablo Sanchez",
                especialidad: "Cirujano veterinario",
                img: "https://images.pexels.com/photos/6235241/pexels-photo-6235241.jpeg",
              },
              {
                nombre: "Dra. Laura Torres",
                especialidad: "Medicina general",
                img: "https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg",
              },
              {
                nombre: "Dr. Martín Gómez",
                especialidad: "Dermatología animal",
                img: "https://images.pexels.com/photos/7468978/pexels-photo-7468978.jpeg",
              },
            ].map((prof, i) => (
              <div className="col-md-4 col-lg-3 mb-4" key={i}>
                <div
                  className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 card-prof"
                  style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
                >
                  <div className="p-4 text-center cardsgradienteverde">
                    <img
                      src={prof.img}
                      alt={prof.nombre}
                      className="rounded-circle border border-3 border-light mb-3 imagenProfesional"
                      width="100"
                      height="100"
                    />
                    <h5 className="fw-bold">{prof.nombre}</h5>
                    <p className="mb-3">{prof.especialidad}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-5 intercaloverde">
        <div className="container text-center">
          <h3 className="mb-4">
            <span className="text-warning">Testimonios</span> | Tu opinión nos
            importa
          </h3>
          <div className="row">
            {[
              {
                nombre: "María López",
                texto: "Excelente atención, mi perro salió feliz!",
                estrellas: 5,
              },
              {
                nombre: "Carlos Díaz",
                texto: "Muy profesionales y atentos en todo momento.",
                estrellas: 4,
              },
              {
                nombre: "Lucía Torres",
                texto: "Gran experiencia, los recomiendo totalmente!",
                estrellas: 5,
              },
            ].map((test, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div
                  className="card border-0 shadow-lg rounded-4 p-4 h-100 card-test cardservicioamarillo"
                  style={{
                    background: "#fff8d8ff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                >
                  <i className="bi bi-chat-quote text-success display-5 mb-3"></i>
                  <p className="fst-italic">"{test.texto}"</p>
                  <p className="text-warning">
                    {"★".repeat(test.estrellas)}
                    {"☆".repeat(5 - test.estrellas)}
                  </p>
                  <h6 className="fw-bold mt-2">{test.nombre}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Inicio;