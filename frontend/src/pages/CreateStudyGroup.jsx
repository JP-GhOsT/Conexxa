import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateStudyGroup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    subject: "",
    objective: "",
    locationType: "ONLINE",
    participantLimit: 1,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "participantLimit" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post(
        "/groups/study-groups",
        form
      );

      alert(data.message || "Grupo criado com sucesso!");

      setForm({
        subject: "",
        objective: "",
        locationType: "ONLINE",
        participantLimit: 1,
      });

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Erro ao criar grupo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        {/* HEADER */}
        <div style={styles.header}>
          <button
            style={styles.backButton}
            onClick={() => navigate("/dashboard")}
          >
            ⬅ Voltar
          </button>

          <h2 style={styles.title}>
            📚 Criar Grupo de Estudo
          </h2>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>

          <input
            name="subject"
            placeholder="Matéria (ex: Matemática)"
            value={form.subject}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="objective"
            placeholder="Objetivo do grupo..."
            value={form.objective}
            onChange={handleChange}
            style={styles.textarea}
          />

          <select
            name="locationType"
            value={form.locationType}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="ONLINE">Online</option>
            <option value="PRESENTIAL">Presencial</option>
          </select>

          <input
            type="number"
            name="participantLimit"
            value={form.participantLimit}
            onChange={handleChange}
            min="1"
            style={styles.input}
          />

          <button
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Criando..." : "Criar Grupo"}
          </button>

        </form>

      </div>

    </div>
  );
}

/* =========================
   STYLES
========================= */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    padding: 20,
    fontFamily: "Arial"
  },

  card: {
    width: "100%",
    maxWidth: 500,
    background: "#fff",
    padding: 30,
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },

  backButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: 8,
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold"
  },

  title: {
    margin: 0,
    fontSize: 18
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },

  input: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 14,
    outline: "none"
  },

  textarea: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 14,
    minHeight: 100,
    resize: "none",
    outline: "none"
  },

  button: {
    marginTop: 10,
    padding: 14,
    border: "none",
    borderRadius: 8,
    background: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }
};