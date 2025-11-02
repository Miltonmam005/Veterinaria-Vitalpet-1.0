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
      body: JSON.stringify(usuarioNuevo),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

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
    console.error("Error enviando mensaje:", error);
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
