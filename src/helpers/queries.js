
const API_PRODUCTOS = import.meta.env.VITE_API_PRODUCTOS;
const API_USUARIOS = import.meta.env.VITE_API_USUARIOS;
const API_TURNOS = import.meta.env.VITE_API_TURNOS;
const API_PACIENTES = import.meta.env.VITE_API_PACIENTES;

// ==================== PRODUCTOS VETERINARIOS ====================
export const crearProducto = async (productoNuevo) => {
  try {
    const formData = new FormData();
    formData.append("title", productoNuevo.title);
    formData.append("description_breve", productoNuevo.description_breve);
    formData.append("description_amplia", productoNuevo.description_amplia);
    formData.append("price", productoNuevo.price);
    formData.append("image", productoNuevo.image);
    formData.append("category", productoNuevo.category);
    formData.append("type", productoNuevo.type);
    formData.append("stock", productoNuevo.stock);
    formData.append("alt", productoNuevo.alt);
    formData.append("destacada", productoNuevo.destacada || false);
    
    const respuesta = await fetch(API_PRODUCTOS, {
      method: "POST",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey"))?.token,
      },
      body: formData,
    });
    return respuesta;
  } catch (error) {
    console.error("Error creando producto:", error);
    return null;
  }
};

export const obtenerProductos = async () => {
  try {
    const respuesta = await fetch(API_PRODUCTOS);
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return null;
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    const respuesta = await fetch(`${API_PRODUCTOS}/${id}`);
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo producto por ID:", error);
    return null;
  }
};

export const borrarProducto = async (id) => {
  try {
    const respuesta = await fetch(`${API_PRODUCTOS}/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey"))?.token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error borrando producto:", error);
    return null;
  }
};

export const editarProducto = async (productoEditado, id) => {
  try {
    const respuesta = await fetch(`${API_PRODUCTOS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey"))?.token,
      },
      body: JSON.stringify(productoEditado),
    });
    return respuesta;
  } catch (error) {
    console.error("Error editando producto:", error);
    return null;
  }
};

export const leerProductosPaginados = async (page = 1, limit = 10, search = "") => {
  try {
    const respuesta = await fetch(
      `${API_PRODUCTOS}/paginacion?page=${page}&limit=${limit}&search=${search}`
    );
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo productos paginados:", error);
    return null;
  }
};

export const destacarProducto = async (id) => {
  try {
    const respuesta = await fetch(`${API_PRODUCTOS}/${id}/destacar`, {
      method: "PATCH",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey"))?.token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error destacando producto:", error);
    return null;
  }
};

// ==================== USUARIOS ====================
export const login = async (datosUsuario) => {
  try {
    const respuesta = await fetch(`${API_USUARIOS}/login`, {
const urlUsuarios = import.meta.env.VITE_API_USUARIOS;
const urlMensajes = import.meta.env.VITE_API_MENSAJES;

export const login = async (datosUsuario) => {
  try {
    const respuesta = await fetch(urlUsuarios + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
    });
    return respuesta;
  } catch (error) {
    console.error("Error en login:", error);
    return null;
  }
};

export const registro = async (nuevoUsuario) => {
  try {
    const respuesta = await fetch(API_USUARIOS, {
    console.error(error);
    return null;
  }
};
export const crearUsuario = async (usuarioNuevo) => {
  try {
    const respuesta = await fetch(urlUsuarios, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoUsuario),
    });
    return respuesta;
  } catch (error) {
    console.error("Error en registro:", error);
    return null;
  }
};

export const obtenerUsuarios = async () => {
  try {
    const respuesta = await fetch(API_USUARIOS);
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return null;
  }
};

export const obtenerUsuarioPorId = async (id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("userKey"))?.token;
    const respuesta = await fetch(`${API_USUARIOS}/${id}`, {
      headers: {
        "x-token": token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo usuario por ID:", error);
    return null;
  }
};

export const editarUsuario = async (usuarioEditado, id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("userKey"))?.token;
    const respuesta = await fetch(`${API_USUARIOS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(usuarioEditado),
    });
    return respuesta;
  } catch (error) {
    console.error("Error editando usuario:", error);
      body: JSON.stringify(usuarioNuevo),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const borrarUsuario = async (id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("userKey"))?.token;
    const respuesta = await fetch(`${API_USUARIOS}/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error borrando usuario:", error);
    return null;
  }
};

export const leerUsuariosPaginados = async (page = 1, limit = 10, search = "") => {
  try {
    const respuesta = await fetch(
      `${API_USUARIOS}/paginacion?page=${page}&limit=${limit}&search=${search}`
    );
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo usuarios paginados:", error);
    return null;
  }
};

export const crearUsuarioAdministrador = async (nuevoUsuario) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("userKey"))?.token;
    const respuesta = await fetch(`${API_USUARIOS}/admin/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(nuevoUsuario),
    });
    return respuesta;
  } catch (error) {
    console.error("Error creando usuario administrador:", error);
    return null;
  }
};

// ==================== TURNOS VETERINARIOS ====================
export const crearTurno = async (turnoNuevo) => {
  try {
    const respuesta = await fetch(API_TURNOS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey"))?.token,
      },
      body: JSON.stringify(turnoNuevo),
    });
    return respuesta;
  } catch (error) {
    console.error("Error creando turno:", error);
    return null;
  }
};

export const obtenerTurnos = async () => {
  try {
    const respuesta = await fetch(API_TURNOS);
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo turnos:", error);
    return null;
  }
};

export const obtenerTurnoPorId = async (id) => {
  try {
    const respuesta = await fetch(`${API_TURNOS}/${id}`);
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo turno por ID:", error);
    return null;
  }
};

export const editarTurno = async (turnoEditado, id) => {
  try {
    const respuesta = await fetch(`${API_TURNOS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey"))?.token,
      },
      body: JSON.stringify(turnoEditado),
    });
    return respuesta;
  } catch (error) {
    console.error("Error editando turno:", error);
    return null;
  }
};

export const borrarTurno = async (id) => {
  try {
    const respuesta = await fetch(`${API_TURNOS}/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey"))?.token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error borrando turno:", error);
    return null;
  }
};

export const leerTurnosPaginados = async (page = 1, limit = 10, search = "") => {
  try {
    const respuesta = await fetch(
      `${API_TURNOS}/paginacion?page=${page}&limit=${limit}&search=${search}`
    );
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo turnos paginados:", error);
    return null;
  }
};

// ==================== PACIENTES (MASCOTAS) ====================
export const crearPaciente = async (pacienteNuevo) => {
  try {
    const respuesta = await fetch(API_PACIENTES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey"))?.token,
      },
      body: JSON.stringify(pacienteNuevo),
    });
    return respuesta;
  } catch (error) {
    console.error("Error creando paciente:", error);
    return null;
  }
};

export const obtenerPacientes = async () => {
  try {
    const respuesta = await fetch(API_PACIENTES);
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo pacientes:", error);
    return null;
  }
};

export const obtenerPacientePorId = async (id) => {
  try {
    const respuesta = await fetch(`${API_PACIENTES}/${id}`);
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo paciente por ID:", error);
    return null;
  }
};

export const editarPaciente = async (pacienteEditado, id) => {
  try {
    const respuesta = await fetch(`${API_PACIENTES}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey"))?.token,
      },
      body: JSON.stringify(pacienteEditado),
    });
    return respuesta;
  } catch (error) {
    console.error("Error editando paciente:", error);
    return null;
  }
};

export const borrarPaciente = async (id) => {
  try {
    const respuesta = await fetch(`${API_PACIENTES}/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey"))?.token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error borrando paciente:", error);
    return null;
  }
};

export const leerPacientesPaginados = async (page = 1, limit = 10, search = "") => {
  try {
    const respuesta = await fetch(
      `${API_PACIENTES}/paginacion?page=${page}&limit=${limit}&search=${search}`
    );
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo pacientes paginados:", error);
    return null;
  }
};

// ==================== CONTACTO ====================
export const enviarMensajeContacto = async (mensaje) => {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_CONTACTO || API_USUARIOS}/contacto`, {
export const enviarMensaje = async (mensaje) => {
  try {
    const respuesta = await fetch(urlMensajes, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mensaje),
    });
    return respuesta;
  } catch (error) {
    console.error("Error enviando mensaje de contacto:", error);
    console.error("Error enviando mensaje:", error);
    return null;
  }
};

// ==================== PEDIDOS/CARRITO ====================
export const crearPedido = async (pedido) => {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_PEDIDOS || API_PRODUCTOS}/pedidos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey"))?.token,
      },
      body: JSON.stringify(pedido),
    });
    return respuesta;
  } catch (error) {
    console.error("Error creando pedido:", error);
    return null;
  }
};

export const obtenerPedidosUsuario = async () => {
  try {
    const token = JSON.parse(sessionStorage.getItem("userKey"))?.token;
    const respuesta = await fetch(`${import.meta.env.VITE_API_PEDIDOS || API_PRODUCTOS}/pedidos/usuario`, {
      headers: {
        "x-token": token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo pedidos:", error);
    return null;
  }
};
export const obtenerMensajes = async () => {
  try {
    const respuesta = await fetch(urlMensajes);
    return respuesta;
  } catch (error) {
    console.error("Error obteniendo mensajes:", error);
    return null;
  }
};
