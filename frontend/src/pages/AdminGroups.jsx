import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* =========================
     CARREGAR GRUPOS
  ========================= */
  const loadGroups = async () => {
    try {
      const res = await api.get("/groups/my-admin-groups");
      setGroups(res.data.groups || []);
    } catch (err) {
      console.log("Erro ao buscar grupos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  if (loading) return <p style={styles.loading}>Carregando...</p>;

  return (
    <div style={styles.container}>

      {/* 🔙 BOTÃO VOLTAR */}
      <button
        style={styles.backButton}
        onClick={() => navigate("/dashboard")}
      >
        ⬅ Voltar
      </button>

      <h1>⚙️ Meus Grupos (Admin)</h1>

      {groups.length === 0 ? (
        <p>Você ainda não criou nenhum grupo</p>
      ) : (
        groups.map((group) => (
          <div
            key={group.id}
            style={styles.card}
            onClick={() => navigate(`/edit-group/${group.id}`)}
          >
            {/* INFO */}
            <div>
              <h2>{group.subject}</h2>
              <p>{group.objective}</p>

              <small>
                🌍 {group.location_type} | 👥 {group.participant_limit}
              </small>
            </div>

            {/* AÇÕES */}
            <div style={styles.actions}>
              <button
                style={styles.btnBlue}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/groups/${group.id}/requests`);
                }}
              >
                Solicitações
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* =========================
   STYLES
========================= */
const styles = {
  container: {
    padding: 30,
    fontFamily: "Arial",
    background: "#f5f6fa",
    minHeight: "100vh"
  },

  loading: {
    padding: 20
  },

  backButton: {
    padding: "10px 15px",
    marginBottom: 15,
    background: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold"
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    cursor: "pointer"
  },

  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },

  btnBlue: {
    padding: "8px 12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }
};