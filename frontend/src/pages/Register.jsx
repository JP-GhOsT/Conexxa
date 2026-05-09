import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    nome_completo: "",
    email: "",
    senha: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    if (name === "nome_completo" && !value.trim()) {
      error = "Nome é obrigatório";
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

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error === "";
  };

  const validateAll = () => {
    const fields = ["nome_completo", "email", "senha"];
    let ok = true;
    fields.forEach((f) => {
      const valid = validateField(f, formData[f] ?? "");
      if (!valid) ok = false;
    });
    return ok;
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      toast.error("Corrija os erros do formulário antes de enviar.");
      return;
    }

    setLoading(true);
    try {
      // Ajuste a rota abaixo se seu backend usar /api/usuarios/cadastro
      const response = await api.post("/auth/register", formData);

      // Toast de sucesso (usa mensagem do backend se houver)
      toast.success(response.data.message || "Usuário cadastrado com sucesso!");

      // Backend sugerido retorna userId; ajuste se o seu retornar outro campo
      const userId = response.data.userId || response.data.id || response.data.user?.id;
      if (userId) {
        navigate(`/perfil/${userId}`);
      } else if (response.data.grupoId) {
        // fallback caso backend retorne grupoId por design
        navigate(`/grupos/${response.data.grupoId}`);
      } else {
        navigate("/");
      }

      // Limpar formulário
      setFormData({ nome_completo: "", email: "", senha: "" });
      setErrors({});
    } catch (error) {
      const status = error.response?.status;
      const msg = error.response?.data?.message;

      if (status === 409) {
        setErrors((prev) => ({ ...prev, email: "E-mail já cadastrado" }));
      } else if (msg) {
        toast.error(msg);
      } else {
        toast.error("Erro ao cadastrar usuário.");
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
          name="nome_completo"
          placeholder="Nome completo"
          value={formData.nome_completo}
          onChange={handleChange}
        />
        {errors.nome_completo && <p style={styles.error}>{errors.nome_completo}</p>}

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

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

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
    cursor: "pointer"
  },
  error: {
    color: "red",
    marginBottom: "10px"
  }
};

export default Register;
