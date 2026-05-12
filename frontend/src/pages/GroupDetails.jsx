import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState(null);
  const [status, setStatus] = useState("NONE");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  /* =========================
     CARREGAR DADOS
  ========================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [groupRes, statusRes] = await Promise.all([
          api.get(`/groups/study-groups/${id}`),
          api.get(`/groups/study-groups/${id}/join-request-status`)
        ]);

        setGroup(groupRes.data.group);
        setStatus(statusRes.data.status || "NONE");

      } catch (err) {
        console.log("Erro ao carregar grupo:", err);
        setGroup(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  /* =========================
     JOIN REQUEST
  ========================= */
  const handleJoin = async () => {
    setSending(true);

    try {
      const { data } = await api.post(
        `/groups/study-groups/${id}/join-request`
      );

      setStatus(data.status || "PENDING");

    } catch (err) {
      console.log("Erro ao entrar no grupo:", err);
    } finally {
      setSending(false);
    }
  };

  /* =========================
     BOTÃO DINÂMICO
  ========================= */
  const renderButton = () => {
    if (status === "ACCEPTED") {
      return (
        <button style={styles.successBtn}>
          ✔ Você já faz parte do grupo
        </button>
      );
    }

    if (status === "PENDING") {
      return (
        <button style={styles.pendingBtn} disabled>
          ⏳ Solicitação enviada
        </button>
      );
    }

    if (status === "REJECTED") {
      return (
        <button
          style={styles.dangerBtn}
          onClick={handleJoin}
          disabled={sending}
        >
          🔄 Solicitar novamente
        </button>
      );
    }

    return (
      <button
        style={styles.primaryBtn}
        onClick={handleJoin}
        disabled={sending}
      >
        {sending ? "Enviando..." : "Solicitar entrada"}
      </button>
    );
  };

  /* =========================
     UI
  ========================= */
  if (loading) {
    return <p style={styles.loading}>Carregando...</p>;
  }

  if (!group) {
    return (
      <div style={styles.container}>
        <p>Grupo não encontrado</p>

        <button onClick={() => navigate("/groups")}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/groups")}
          style={{ marginBottom: 15 }}
        >
          ⬅ Voltar
        </button>

        <h1>{group.subject}</h1>

        <p><strong>Objetivo:</strong> {group.objective}</p>
        <p><strong>Tipo:</strong> {group.locationType}</p>
        <p><strong>Limite:</strong> {group.participantLimit}</p>

        <div style={{ marginTop: 20 }}>
          {renderButton()}
        </div>

      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */
const styles = {
  container: {
    padding: 30,
    display: "flex",
    justifyContent: "center",
    fontFamily: "Arial"
  },

  card: {
    width: "100%",
    maxWidth: 500,
    padding: 25,
    borderRadius: 12,
    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
    background: "#fff"
  },

  primaryBtn: {
    width: "100%",
    padding: 12,
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  },

  pendingBtn: {
    width: "100%",
    padding: 12,
    background: "#f0ad4e",
    color: "#fff",
    border: "none",
    borderRadius: 8
  },

  successBtn: {
    width: "100%",
    padding: 12,
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 8
  },

  dangerBtn: {
    width: "100%",
    padding: 12,
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  },

  loading: {
    padding: 20
  }
};