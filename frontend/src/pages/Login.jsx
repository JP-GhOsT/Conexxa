import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });

  const [errors, setErrors] = useState({});

  /* =========================
     VALIDAR CAMPOS
  ========================= */
  const validateField = (name, value) => {

    let error = "";

    if (!value.trim()) {

      if (name === "email") {
        error = "E-mail é obrigatório";
      }

      if (name === "senha") {
        error = "Senha é obrigatória";
      }

    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));

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

    const hasErrors =
      Object.values(errors).some(
        (error) => error !== ""
      );

    if (hasErrors) return;

    try {

      const response = await api.post(
        "/auth/login",
        formData
      );

      // TOKEN
      const token = response.data.token;

      // USER
      const user = response.data.user;

      // LOGIN GLOBAL
      login(token, user);

      alert("Login realizado com sucesso");

      // REDIRECIONAR
      navigate("/dashboard");

    } catch (error) {

      const mensagem =
        error.response?.data?.message ||
        "Ocorreu um erro inesperado.";

      setErrors({
        auth: mensagem
      });

    }

  };

  return (

    <div style={styles.container}>

      <form
        style={styles.form}
        onSubmit={handleSubmit}
      >

        <h1>Login</h1>

        {/* EMAIL */}
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />

        {errors.email && (
          <p style={styles.error}>
            {errors.email}
          </p>
        )}

        {/* SENHA */}
        <input
          style={styles.input}
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
        />

        {errors.senha && (
          <p style={styles.error}>
            {errors.senha}
          </p>
        )}

        {/* ERRO LOGIN */}
        {errors.auth && (
          <p style={styles.error}>
            {errors.auth}
          </p>
        )}

        <button
          style={styles.button}
          type="submit"
        >
          Entrar
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
    boxShadow:
      "0px 0px 10px rgba(0,0,0,0.1)"
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

export default Login;