import { Navigate } from "react-router-dom";
localStorage.removeItem("isAuth");

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth") === "true";

  return isAuth ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
