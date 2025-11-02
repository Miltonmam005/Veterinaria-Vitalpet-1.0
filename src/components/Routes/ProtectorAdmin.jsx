import { Navigate, Outlet } from "react-router";

const ProtectorAdmin = ({ usuarioAdmin }) => {
  if (!usuarioAdmin || !usuarioAdmin.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectorAdmin;
