import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = "http://localhost:3000/groups";

export default function GroupDetails() {
  const { id } = useParams();

  const [group, setGroup] = useState(null);
  const [status, setStatus] = useState("NONE");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const token = localStorage.getItem("token");

  /* =========================
     FETCH GROUP
  ========================= */
  const fetchGroup = async () => {
    try {
      const res = await fetch(`${API}/study-groups/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) throw new Error("Erro ao buscar grupo");

      const data = await res.json();
      setGroup(data.group);
    } catch (err) {
      console.log("fetchGroup error:", err);
    }
  };

  /* =========================
     FETCH STATUS
  ========================= */
  const fetchStatus = async () => {
    try {
      const res = await fetch(
        `${API}/study-groups/${id}/join-request-status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!res.ok) throw new Error("Erro ao buscar status");

      const data = await res.json();
      setStatus(data.status || "NONE");
    } catch (err) {
      console.log("fetchStatus error:", err);
    }
  };

  /* =========================
     JOIN REQUEST
  ========================= */
  const handleJoin = async () => {
    setSending(true);

    try {
      const res = await fetch(
        `${API}/study-groups/${id}/join-request`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      const data = await res.json();

      if (data.success || data.status) {
        setStatus(data.status || "PENDING");
      }
    } catch (err) {
      console.log("handleJoin error:", err);
    }

    setSending(false);
  };

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
    setLoading(true);

    Promise.all([fetchGroup(), fetchStatus()]).finally(() =>
      setLoading(false)
    );
  }, [id]);

  /* =========================
     BUTTON STATUS
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
     RENDER
  ========================= */
  if (loading) return <p style={styles.loading}>Carregando...</p>;

  if (!group) return <p>Grupo não encontrado</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{group.subject}</h1>

        <p style={styles.label}>📘 Objetivo:</p>
        <p>{group.objective}</p>

        <p style={styles.label}>🌍 Tipo:</p>
        <p>{group.locationType}</p>

        <p style={styles.label}>👥 Limite:</p>
        <p>{group.participantLimit}</p>

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

  title: {
    marginBottom: 20
  },

  label: {
    fontWeight: "bold",
    marginTop: 10
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