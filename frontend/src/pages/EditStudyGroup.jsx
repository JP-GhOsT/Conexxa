import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function EditStudyGroup() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     BUSCAR GRUPO
  ========================= */
  useEffect(() => {
    api
      .get(`/study-groups/${id}`)
      .then((res) => {
        setGrupo(res.data.group);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Erro ao carregar grupo");
        setLoading(false);
      });
  }, [id]);

  /* =========================
     ATUALIZAR GRUPO
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/study-groups/${id}`, grupo);

      toast.success(response.data.message || "Grupo atualizado com sucesso");

      // ✅ CORREÇÃO AQUI (rota correta)
      navigate(`/groups/${id}`);

    } catch (err) {
      toast.error("Erro ao atualizar grupo");
    }
  };

  /* =========================
     HANDLE INPUT
  ========================= */
  const handleChange = (e) => {
    setGrupo({
      ...grupo,
      [e.target.name]: e.target.value
    });
  };

  /* =========================
     LOADING / EMPTY
  ========================= */
  if (loading) return <p>Carregando...</p>;
  if (!grupo) return <p>Grupo não encontrado.</p>;

  /* =========================
     UI
  ========================= */
  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Editar Grupo de Estudo</h2>

        <input
          style={styles.input}
          name="subject"
          value={grupo.subject || ""}
          onChange={handleChange}
          placeholder="Matéria"
        />

        <input
          style={styles.input}
          name="objective"
          value={grupo.objective || ""}
          onChange={handleChange}
          placeholder="Objetivo"
        />

        <select
          style={styles.input}
          name="locationType"
          value={grupo.locationType || "ONLINE"}
          onChange={handleChange}
        >
          <option value="ONLINE">Online</option>
          <option value="PRESENTIAL">Presencial</option>
        </select>

        <input
          style={styles.input}
          type="number"
          name="participantLimit"
          value={grupo.participantLimit || 1}
          onChange={handleChange}
          placeholder="Limite de participantes"
        />

        <button style={styles.button} type="submit">
          Salvar alterações
        </button>
      </form>
    </div>
  );
}

/* =========================
   ESTILOS
========================= */
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "350px",
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  input: {
    marginBottom: "10px",
    padding: "12px",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
};

export default EditStudyGroup;