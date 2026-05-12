import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1>Perfil</h1>

        <button
          style={styles.backButton}
          onClick={() => navigate("/dashboard")}
        >
          ⬅ Voltar
        </button>
      </div>

      {/* CARD */}
      <div style={styles.card}>
        <p><strong>Nome:</strong> {user?.nomeCompleto}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      {/* LOGOUT */}
      <button onClick={handleLogout} style={styles.button}>
        Sair (Logout)
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
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  backButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: 6,
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold"
  },

  card: {
    padding: 20,
    background: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 20,
    width: 300,
  },

  button: {
    padding: 12,
    background: "red",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: 6,
  }
};