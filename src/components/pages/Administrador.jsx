import { Button, Table } from "react-bootstrap";
import ItemProductos from "./componentesAdministrador/ItemProductos.jsx";
import { Link } from "react-router";
import { cardsData } from "../data/cardsData.js";

const Administrador = ({
  productos,
  setProductos,
  borrarProducto,
  destacarProducto,
}) => {
  const cargarDatosPrueba = () => {
    setProductos(cardsData);
  };

  return (
    <section className="container">
      <div className="row justify-content-between align-items-center mt-5">
        <h1 className="display-4 tinos">Catálogo de Productos</h1>
        <div className="d-flex gap-2 my-2">
          <Link to={"/administrador/crear"} className="btn btn-success">
            Agregar Producto
            <i className="bi bi-file-earmark-plus ms-2"></i>
          </Link>
          <Button className="btn btn-info ms-2" onClick={cargarDatosPrueba}>
            <i className="bi bi-database-fill-add"></i>
          </Button>
        </div>
      </div>
      <hr />
      <Table responsive striped bordered hover className="raleway">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {productos && productos.length > 0 ? (
            productos.map((producto, indice) => (
              <ItemProductos
                key={producto.id}
                fila={indice + 1}
                producto={producto}
                destacarProducto={destacarProducto}
                borrarProducto={borrarProducto}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted py-4">
                No hay productos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </section>
  );
};

export default Administrador;
