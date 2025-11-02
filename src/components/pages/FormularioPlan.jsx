import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
function FormularioPlan() {
  const { planNombre } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitForm = (data) => {
    console.log("Formulario enviado:", {
      ...data,
      planSeleccionado: planNombre,
    });
    Swal.fire({
      title: `Gracias ${data.nombre}`,
      text: " el plan ha sido elegido!",
      icon: "success",
    }).then(() => {
      reset();
    });
  };



  return (
    <div className="formulario-plan-bg py-5">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card formulario-card shadow-lg p-4 rounded-5 col-12 col-md-8 col-lg-6">
          <div className="text-center mb-4">
            <div className="icono-circular mb-3">



              <i className="bi bi-heart-pulse fs-2 text-light"></i>
            </div>
            <h2 className="fw-bold text-verde mt-2">
              Suscribite al plan{" "}
              <span className="text-dorado">{planNombre}</span>
            </h2>
            <p className="text-muted mb-0">
              Completá tus datos para cuidar mejor a tu mascota
            </p>
          </div>



          {/* FORMULARIO */}
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Nombre completo
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill shadow-sm"
                  placeholder="Ej: María González"
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                    minLength: {
                      value: 3,
                      message: "Debe tener al menos 3 caracteres",


                    },
                    maxLength: {
                      value: 30,
                      message: "Máximo 30 caracteres",
                    },
                  })}
                />
                {errors.nombre && (
                  <p className="text-danger small">{errors.nombre.message}</p>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Correo electrónico
                </label>


                <input
                  type="email"
                  className="form-control rounded-pill shadow-sm"
                  placeholder="Ej: maria@mail.com"
                  {...register("email", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                      message: "Correo no válido",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-danger small">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Teléfono</label>
                <input
                  type="tel"
                  className="form-control rounded-pill shadow-sm"
                  placeholder="Ej: +54 9 351 1234567"

                  {...register("telefono", {
                    required: "El teléfono es obligatorio",
                    pattern: {
                      value: /^[0-9+\s-]{6,20}$/,
                      message: "Número no válido",
                    },
                  })}
                />
                {errors.telefono && (




<p className="text-danger small">{errors.telefono.message}</p>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">

                  Nombre de la mascota
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill shadow-sm"
                  placeholder="Ej: Rocky"
                  {...register("mascota", {
                    required: "El nombre de la mascota es obligatorio",
                    minLength: {
                      value: 2,
                      message: "Debe tener al menos 2 caracteres",
                    },
                  })}
                />
                {errors.mascota && (
                  <p className="text-danger small">{errors.mascota.message}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Edad de la mascota
              </label>
              <input
                type="number"
                className="form-control rounded-pill shadow-sm"
                placeholder="Ej: 3"
                {...register("edadMascota", {
                  required: "La edad es obligatoria",
                  min: {
                    value: 0,
                    message: "Debe ser mayor o igual a 0",
                  },
                  max: {
                    value: 30,
                    message: "Debe ser menor a 30 años",
                  },
                })}
              />
              {errors.edadMascota && (
                <p className="text-danger small">
                  {errors.edadMascota.message}
                </p>
              )}
            </div>




            <button
              type="submit"
              className="btn btn-verde w-100 fw-semibold rounded-pill py-2"
            >
              <i className="bi bi-send-fill me-2"></i> Enviar solicitud
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioPlan;
