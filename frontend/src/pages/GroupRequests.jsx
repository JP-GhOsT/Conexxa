import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function GroupRequests() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const res = await api.get(
        `/groups/study-groups/${id}/requests`
      );
      setRequests(res.data.requests || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [id]);

  /* =========================
     ACTIONS
  ========================= */

  const accept = async (userId) => {
    await api.patch(
      `/groups/study-groups/${id}/requests/${userId}/accept`
    );

    loadRequests();
  };

  const reject = async (userId) => {
    await api.patch(
      `/groups/study-groups/${id}/requests/${userId}/reject`
    );

    loadRequests();
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={styles.container}>

      {/* 🔙 BOTÃO VOLTAR */}
      <button
        style={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ⬅ Voltar
      </button>

      <h1>📥 Solicitações do Grupo</h1>

      {requests.length === 0 ? (
        <p>Nenhuma solicitação pendente</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} style={styles.card}>
            <div>
              <strong>{req.nomeCompleto}</strong>
              <p>{req.email}</p>
            </div>

            <div style={styles.actions}>
              <button
                style={styles.accept}
                onClick={() => accept(req.user_id)}
              >
                Aceitar
              </button>

              <button
                style={styles.reject}
                onClick={() => reject(req.user_id)}
              >
                Rejeitar
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
    fontFamily: "Arial"
  },

  backButton: {
    marginBottom: 15,
    padding: "10px 15px",
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
    padding: 15,
    marginBottom: 10,
    border: "1px solid #ddd",
    borderRadius: 10
  },

  actions: {
    display: "flex",
    gap: 10
  },

  accept: {
    background: "#28a745",
    color: "#fff",
    border: "none",
    padding: 8,
    borderRadius: 6,
    cursor: "pointer"
  },

  reject: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: 8,
    borderRadius: 6,
    cursor: "pointer"
  }
};