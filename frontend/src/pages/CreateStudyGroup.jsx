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

  /* =========================
     HANDLE INPUT
  ========================= */
  function handleChange(e) {

    const { name, value } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]:
        name === "participantLimit"
          ? Number(value)
          : value,

    }));

  }

  /* =========================
     SUBMIT
  ========================= */
  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);

    try {

      // TOKEN
      const token =
        localStorage.getItem("token");

      // REQUEST
      const { data } = await api.post(

        "/study-groups",

        form,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      alert(
        data.message ||
        "Grupo criado com sucesso!"
      );

      // RESET
      setForm({

        subject: "",

        objective: "",

        locationType: "ONLINE",

        participantLimit: 1,

      });

    } catch (error) {

      console.error(error);

      alert(

        error.response?.data?.message ||

        "Erro ao criar grupo"

      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div style={styles.container}>

      <h2>Criar Grupo de Estudo</h2>

      <form
        onSubmit={handleSubmit}
        style={styles.form}
      >

        {/* SUBJECT */}
        <input
          name="subject"
          placeholder="Matéria"
          value={form.subject}
          onChange={handleChange}
          style={styles.input}
        />

        {/* OBJECTIVE */}
        <textarea
          name="objective"
          placeholder="Objetivo do grupo"
          value={form.objective}
          onChange={handleChange}
          style={styles.textarea}
        />

        {/* LOCATION */}
        <select
          name="locationType"
          value={form.locationType}
          onChange={handleChange}
          style={styles.input}
        >

          <option value="ONLINE">
            Online
          </option>

          <option value="PRESENTIAL">
            Presencial
          </option>

        </select>

        {/* LIMIT */}
        <input
          type="number"
          name="participantLimit"
          value={form.participantLimit}
          onChange={handleChange}
          min="1"
          style={styles.input}
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          style={styles.button}
        >

          {loading
            ? "Criando..."
            : "Criar Grupo"}

        </button>

      </form>

    </div>

  );

}

const styles = {

  container: {

    maxWidth: 500,

    margin: "50px auto",

    padding: 20,

    fontFamily: "Arial",

  },

  form: {

    display: "flex",

    flexDirection: "column",

    gap: 10,

  },

  input: {

    padding: 10,

    fontSize: 14,

  },

  textarea: {

    padding: 10,

    fontSize: 14,

    minHeight: 80,

  },

  button: {

    padding: 12,

    backgroundColor: "#4CAF50",

    color: "#fff",

    border: "none",

    cursor: "pointer",

  },

};