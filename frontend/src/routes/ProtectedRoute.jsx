import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { authenticated, loading } = useContext(AuthContext);

  // 🔥 IMPORTANTE: não decide nada enquanto carrega
  if (loading) {
    return <h1>Carregando...</h1>;
  }

  // só depois de carregar decide
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}