import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const res = await api.get("/groups/study-groups");
        setGroups(res.data.groups || []);
      } catch (err) {
        console.log("Erro ao buscar grupos:", err);
      } finally {
        setLoading(false);
      }
    };

    const cancelarSolicitacao = async (groupId) => {
      try {
        await api.delete(
          `/groups/${groupId}/join-request`
        );

        setGroups((prev) =>
          prev.map((group) =>
            group.id === groupId
              ? {
                ...group,
                status: "cancelado",
              }
              : group
          )
        );

        alert("Solicitação cancelada!");

      } catch (error) {
        console.log(error);

        alert("Erro ao cancelar solicitação");
      }
    };

    loadGroups();
  }, []);

  if (loading) {
    return <p style={styles.loading}>Carregando grupos...</p>;
  }

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>📚 Grupos de Estudo</h1>

        <button
          style={styles.backButton}
          onClick={() => navigate("/dashboard")}
        >
          ⬅ Voltar
        </button>
      </div>

      {groups.length === 0 ? (
        <p style={styles.empty}>Nenhum grupo encontrado.</p>
      ) : (
        <div style={styles.grid}>
          {groups.map((group) => (
            <div
              key={group.id}
              style={styles.card}
              onClick={() => navigate(`/groups/${group.id}`)}
            >
              <h2 style={styles.subject}>{group.subject}</h2>

              <p style={styles.text}>{group.objective}</p>

              <div style={styles.footer}>
                {group.status === "pendente" && (
                  <button
                    style={styles.cancelButton}
                    onClick={(e) => {
                      e.stopPropagation();

                      cancelarSolicitacao(group.id);
                    }}
                  >
                    Cancelar solicitação
                  </button>
                )}
                <span>🌍 {group.locationType}</span>
                <span>👥 {group.participantLimit}</span>
              </div>
            </div>
          ))}
        </div>
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

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  title: {
    margin: 0
  },

  backButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: 8,
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold"
  },

  loading: {
    padding: 30
  },

  empty: {
    marginTop: 20,
    color: "#666"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "0.2s"
  },

  subject: {
    marginBottom: 10
  },

  text: {
    color: "#555",
    marginBottom: 15
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    color: "#777"
  },

  cancelButton: {
    marginTop: 15,
    padding: "10px",
    border: "none",
    borderRadius: 8,
    background: "#dc3545",
    color: "#fff",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold"
  }
};