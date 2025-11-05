import { Button, Badge } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ItemProducto = ({ producto, fila, borrarProducto, destacarProducto }) => {
  const eliminarProducto = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a eliminar el producto "${producto.title}"`,
      html: `
        <div class="text-start">
          <p><strong>Producto:</strong> ${producto.title}</p>
          <p><strong>Precio:</strong> $${producto.price || "N/A"}</p>
          <p><strong>Categoría:</strong> ${producto.category || "Sin categoría"}</p>
          <p class="text-danger mt-2"><i class="bi bi-exclamation-triangle"></i> Esta acción no se puede deshacer</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return borrarProducto(producto._id || producto.id);
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          Swal.fire({
            title: "¡Eliminado!",
            text: `El producto "${producto.title}" fue eliminado correctamente`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            title: "Error",
            text: `No se pudo eliminar el producto "${producto.title}"`,
            icon: "error"
          });
        }
      }
    });
  };

  const toggleDestacado = () => {
    const accion = producto.destacada ? "quitar de destacados" : "marcar como destacado";
    
    Swal.fire({
      title: `${producto.destacada ? "Quitar de destacados" : "Destacar producto"}`,
      text: `¿Quieres ${accion} "${producto.title}"?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        if (destacarProducto(producto._id || producto.id)) {
          Swal.fire({
            title: "¡Actualizado!",
            text: `El producto fue ${accion} correctamente`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
        }
      }
    });
  };

  // Función para formatear precio
  const formatPrecio = (precio) => {
    if (!precio) return "N/A";
    return typeof precio === 'number' ? `$${precio.toFixed(2)}` : `$${precio}`;
  };

  // Función para obtener badge de categoría
  const getBadgeCategoria = (categoria) => {
    const colores = {
      'Alimentación': 'success',
      'Juguetes': 'warning',
      'Accesorios': 'info',
      'Higiene': 'primary',
      'Camas y Casas': 'secondary',
      'Transporte': 'dark',
      'Salud': 'danger',
      'Ropa': 'light'
    };
    
    return colores[categoria] || 'secondary';
  };

  // Función para obtener badge de tipo
  const getBadgeTipo = (tipo) => {
    return tipo === 'Producto' ? 'outline-primary' : 'outline-success';
  };

  return (
    <tr className="align-middle">
      <td className="text-center fw-bold">{fila}</td>
      
      <td>
        <div className="d-flex align-items-center">
          {producto.image && (
            <img 
              src={producto.image} 
              alt={producto.alt || producto.title}
              className="rounded me-2"
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
          )}
          <div>
            <div className="fw-semibold">{producto.title}</div>
            {producto.description_breve && (
              <small className="text-muted d-block">
                {producto.description_breve.substring(0, 50)}...
              </small>
            )}
          </div>
        </div>
      </td>
      
      <td className="text-center">
        <Badge bg={getBadgeTipo(producto.type)} text="dark" className="fw-normal">
          {producto.type || "N/A"}
        </Badge>
      </td>
      
      <td className="text-center">
        <Badge bg={getBadgeCategoria(producto.category)} className="fw-normal">
          {producto.category || producto.genre || "Sin categoría"}
        </Badge>
      </td>
      
      <td className="text-center fw-bold text-success">
        {formatPrecio(producto.price)}
      </td>
      
      <td className="text-center">
        {producto.stock !== undefined ? (
          <Badge 
            bg={producto.stock > 10 ? "success" : producto.stock > 0 ? "warning" : "danger"}
          >
            {producto.stock} unidades
          </Badge>
        ) : (
          <Badge bg="secondary">N/A</Badge>
        )}
      </td>
      
      <td className="text-center">
        <Button
          variant={producto.destacada ? "warning" : "outline-warning"}
          size="sm"
          onClick={toggleDestacado}
          className="border-0"
          title={producto.destacada ? "Quitar de destacados" : "Marcar como destacado"}
        >
          {producto.destacada ? (
            <i className="bi bi-star-fill fs-6"></i>
          ) : (
            <i className="bi bi-star fs-6"></i>
          )}
        </Button>
      </td>
      
      <td className="text-center">
        <div className="d-flex gap-1 justify-content-center">
          <Link
            to={`/administrador/editar/${producto._id || producto.id}`}
            className="btn btn-outline-warning btn-sm"
            title="Editar producto"
          >
            <i className="bi bi-pencil"></i>
          </Link>
          
          <Button
            variant="outline-danger"
            size="sm"
            onClick={eliminarProducto}
            title="Eliminar producto"
          >
            <i className="bi bi-trash"></i>
          </Button>
          
          <Link
            to={`/detalle-producto/${producto._id || producto.id}`}
            className="btn btn-outline-info btn-sm"
            title="Ver detalles"
          >
            <i className="bi bi-eye"></i>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ItemProducto;