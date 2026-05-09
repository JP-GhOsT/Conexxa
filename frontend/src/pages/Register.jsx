import { useState } from "react";
import api from "../services/api";

function Register() {

  const [formData, setFormData] = useState({
    nome_completo: "",
    email: "",
    senha: ""
  });

  const [errors, setErrors] = useState({});

  const [success, setSuccess] = useState("");

  // VALIDAR FORMULÁRIO
  const validateField = (name, value) => {

    let error = "";

    // VALIDAR NOME
    if (name === "nome_completo") {

      if (!value.trim()) {
        error = "Nome é obrigatório";
      }

    }

    // VALIDAR EMAIL
    if (name === "email") {

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        error = "E-mail inválido";
      }

    }

    // VALIDAR SENHA
    if (name === "senha") {

      const senhaRegex =
        /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

      if (!senhaRegex.test(value)) {
        error =
          "Senha deve ter no mínimo 8 caracteres, 1 letra e 1 número";
      }

    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));

  };

  // HANDLE INPUT
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    validateField(name, value);

  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    setSuccess("");

    // VERIFICAR ERROS
    const hasErrors =
      Object.values(errors).some(
        (error) => error !== ""
      );

    if (hasErrors) return;

    try {

      const response =
        await api.post(
          "/auth/register",
          formData
        );

      console.log(response.data);

      setSuccess(
        "Usuário cadastrado com sucesso"
      );

      // LIMPAR FORM
      setFormData({
        nome_completo: "",
        email: "",
        senha: ""
      });

    } catch (error) {

      if (
        error.response &&
        error.response.status === 409
      ) {

        setErrors({
          email: "E-mail já cadastrado"
        });

      } else {

        alert("Erro ao cadastrar");

      }

    }

  };

  return (

    <div style={styles.container}>

      <form
        style={styles.form}
        onSubmit={handleSubmit}
      >

        <h1>Cadastro</h1>

        {/* NOME */}
        <input
          style={styles.input}
          type="text"
          name="nome_completo"
          placeholder="Nome completo"
          value={formData.nome_completo}
          onChange={handleChange}
        />

        {errors.nome_completo && (
          <p style={styles.error}>
            {errors.nome_completo}
          </p>
        )}

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

        <button
          style={styles.button}
          type="submit"
        >
          Cadastrar
        </button>

        {success && (
          <p style={styles.success}>
            {success}
          </p>
        )}

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
  },

  success: {
    color: "green",
    marginTop: "10px"
  }

};

export default Register;