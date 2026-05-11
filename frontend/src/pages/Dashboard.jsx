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

      <div style={styles.grid}>

        {/* CRIAR GRUPO */}
        <div
          style={styles.card}
          onClick={() => navigate("/create-group")}
        >
          <h2>Criar Grupo</h2>
          <p>Criar novo grupo de estudo</p>
        </div>

        {/* LISTAR GRUPOS */}
        <div
          style={styles.card}
          onClick={() => navigate("/groups")}
        >
          <h2>Grupos</h2>
          <p>Ver grupos disponíveis</p>
        </div>

        {/* PERFIL (opcional futuro) */}
        <div
          style={styles.card}
          onClick={() => navigate("/profile")}
        >
          <h2>Perfil</h2>
          <p>Ver seus dados</p>
        </div>

      </div>

      <button
        onClick={handleLogout}
        style={styles.logout}
      >
        Sair
      </button>

    </div>
  );
}

const styles = {

  container: {
    padding: 40,
    fontFamily: "Arial",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginTop: 30,
  },

  card: {
    padding: 20,
    background: "#f5f5f5",
    borderRadius: 10,
    cursor: "pointer",
    transition: "0.2s",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
  },

  logout: {
    marginTop: 40,
    padding: 12,
    background: "red",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: 6,
  }

};