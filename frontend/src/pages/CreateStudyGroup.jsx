import { useState } from "react";
import api from "../services/api";

export default function CreateStudyGroup() {
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
      [name]: name === "participantLimit" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/groups/study-groups", form);

      alert(data.message || "Grupo criado com sucesso!");

      setForm({
        subject: "",
        objective: "",
        locationType: "ONLINE",
        participantLimit: 1,
      });

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Erro ao criar grupo"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", fontFamily: "Arial" }}>
      <h2>Criar Grupo de Estudo</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>

        <input
          name="subject"
          placeholder="Matéria"
          value={form.subject}
          onChange={handleChange}
        />

        <textarea
          name="objective"
          placeholder="Objetivo"
          value={form.objective}
          onChange={handleChange}
        />

        <select
          name="locationType"
          value={form.locationType}
          onChange={handleChange}
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
        />

        <button disabled={loading}>
          {loading ? "Criando..." : "Criar Grupo"}
        </button>

      </form>
    </div>
  );
}