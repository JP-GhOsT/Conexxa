import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    senha: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* =========================
     VALIDAR CAMPOS
  ========================= */
  const validateField = (name, value) => {
    let error = "";

    if (name === "nomeCompleto") {
      if (!value.trim()) error = "Nome é obrigatório";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value.trim()) {
        error = "E-mail é obrigatório";
      } else if (!emailRegex.test(value)) {
        error = "E-mail inválido";
      }
    }

    if (name === "senha") {
      const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

      if (!value.trim()) {
        error = "Senha é obrigatória";
      } else if (!senhaRegex.test(value)) {
        error = "Senha deve ter no mínimo 8 caracteres, 1 letra e 1 número";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));

    return error === "";
  };

  /* =========================
     VALIDAR TUDO
  ========================= */
  const validateAll = () => {
    const fields = ["nomeCompleto", "email", "senha"];

    let ok = true;

    fields.forEach((field) => {
      const valid = validateField(field, formData[field] ?? "");
      if (!valid) ok = false;
    });

    return ok;
  };

  /* =========================
     HANDLE INPUT
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    validateField(name, value);
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      toast.error("Corrija os erros antes de enviar.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", formData);

      toast.success(
        response.data.message || "Usuário cadastrado com sucesso!"
      );

      // limpar form
      setFormData({
        nomeCompleto: "",
        email: "",
        senha: ""
      });

      setErrors({});

      // redirecionar para login
      setTimeout(() => {
        navigate("/login");
      }, 500);

    } catch (error) {
      const status = error.response?.status;

      if (status === 409) {
        setErrors((prev) => ({
          ...prev,
          email: "E-mail já cadastrado"
        }));
      } else {
        toast.error(
          error.response?.data?.message || "Erro ao cadastrar usuário."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1>Cadastro</h1>

        <input
          style={styles.input}
          type="text"
          name="nomeCompleto"
          placeholder="Nome completo"
          value={formData.nomeCompleto}
          onChange={handleChange}
        />
        {errors.nomeCompleto && <p style={styles.error}>{errors.nomeCompleto}</p>}

        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}

        <input
          style={styles.input}
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
        />
        {errors.senha && <p style={styles.error}>{errors.senha}</p>}

        <button
          style={styles.button}
          type="submit"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <button
          type="button"
          style={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          Já tenho conta
        </button>
      </form>
    </div>
  );
}

/* =========================
   STYLES
========================= */
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    width: "350px",
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
  },

  input: {
    marginBottom: "10px",
    padding: "12px",
    fontSize: "16px"
  },

  button: {
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginTop: "10px"
  },

  loginButton: {
    marginTop: "10px",
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
    background: "transparent",
    border: "1px solid #007bff",
    color: "#007bff",
    borderRadius: "6px"
  },

  error: {
    color: "red",
    marginBottom: "10px"
  }
};

export default Register;