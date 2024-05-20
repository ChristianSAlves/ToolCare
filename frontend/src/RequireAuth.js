import { Navigate } from "react-router-dom";

function RequireAuth({ children, redirectTo = "/login" }) {
  // Substitua a linha abaixo pela sua lógica real de verificação de autenticação
  const isAuthenticated =!!localStorage.getItem("token"); // Exemplo de verificação de autenticação

  return isAuthenticated? children : <Navigate to={redirectTo} />;
}

export default RequireAuth
