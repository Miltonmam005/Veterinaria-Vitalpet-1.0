import { Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ItemProducto = ({ producto, fila, borrarProducto, destacarProducto }) => {
  const eliminarProducto = () => {
    Swal.fire({
      title: "Eliminar producto",
      text: "No puedes revertir este paso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#277a35ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, quiero eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (borrarProducto(producto.id)) {
          Swal.fire({
            title: "Producto eliminado!",
            text: `El producto ${producto.title} fue eliminado correctamente`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Ocurrió un error!",
            text: `El producto ${producto.title} no pudo ser eliminado`,
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <tr>
      <td className="text-center">{fila}</td>
      <td>{producto.title}</td>
      <td className="text-center">{producto.type}</td>
      <td className="text-center">{producto.price || "N/A"}</td>
      <td>{producto.category || producto.genre || "Sin categoría"}</td>
      <td className="text-center">
        <div className="d-flex gap-1 justify-content-center">
          <Link
            to={`/administrador/editar/${producto.id}`}
            className="btn btn-warning me-lg-2"
          >
            <i className="bi bi-pencil-square"></i>
          </Link>
          <Button
            variant="danger"
            onClick={eliminarProducto}
            className="me-lg-2"
          >
            <i className="bi bi-trash"></i>
          </Button>
          <Button
            variant="outline-success"
            onClick={() => destacarProducto(producto.id)}
            className="border-0"
          >
            {producto.destacada ? (
              <i className="bi bi-star-fill fs-5 text-warning"></i>
            ) : (
              <i className="bi bi-star fs-5 text-secondary"></i>
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ItemProducto;
