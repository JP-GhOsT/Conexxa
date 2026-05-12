import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>

      <h1>Dashboard</h1>

      <p>
        Bem-vindo, {user?.nomeCompleto || "Usuário"} 👋
      </p>

      {/* =========================
          GRID PRINCIPAL
      ========================= */}
      <div style={styles.grid}>

        {/* =========================
            CRIAR GRUPO
        ========================= */}
        <div
          style={styles.card}
          onClick={() => navigate("/create-group")}
        >
          <h2>➕ Criar Grupo</h2>
          <p>Criar novo grupo de estudo</p>
        </div>

        {/* =========================
            LISTAR GRUPOS
        ========================= */}
        <div
          style={styles.card}
          onClick={() => navigate("/groups")}
        >
          <h2>📚 Grupos</h2>
          <p>Ver grupos disponíveis</p>
        </div>

        {/* =========================
            ADMIN GRUPOS (NOVO)
        ========================= */}
        <div
          style={styles.card}
          onClick={() => navigate("/admin/groups")}
        >
          <h2>⚙️ Meus Grupos</h2>
          <p>Gerenciar grupos que você criou</p>
        </div>

        {/* =========================
            PERFIL
        ========================= */}
        <div
          style={styles.card}
          onClick={() => navigate("/profile")}
        >
          <h2>👤 Perfil</h2>
          <p>Ver seus dados</p>
        </div>

      </div>

      {/* =========================
          LOGOUT
      ========================= */}
      <button
        onClick={handleLogout}
        style={styles.logout}
      >
        🚪 Sair
      </button>

    </div>
  );
}

/* =========================
   STYLES
========================= */
const styles = {

  container: {
    padding: 40,
    fontFamily: "Arial",
    background: "#f9f9f9",
    minHeight: "100vh"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    marginTop: 30
  },

  card: {
    padding: 20,
    background: "#fff",
    borderRadius: 12,
    cursor: "pointer",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
    transition: "0.2s",
    userSelect: "none"
  },

  logout: {
    marginTop: 40,
    padding: 12,
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: 8,
    fontWeight: "bold"
  }
};