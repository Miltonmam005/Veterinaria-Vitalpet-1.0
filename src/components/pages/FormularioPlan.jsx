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