const db = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const register = async (req, res) => {
  try {
    const { nome_completo, email, senha } = req.body;

    if (!nome_completo || !email || !senha) {
      return res.status(400).json({
        success: false,
        message: "Todos os campos são obrigatórios"
      });
    }

    if (senha.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Senha deve ter no mínimo 8 caracteres"
      });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const id = uuidv4();

    db.run(
      `
      INSERT INTO users (
        id,
        nome_completo,
        email,
        senha_hash
      )
      VALUES (?, ?, ?, ?)
      `,
      [id, nome_completo, email, senha_hash],
      function (err) {

        if (err) {
          return res.status(400).json({
            success: false,
            message: "E-mail já cadastrado"
          });
        }

        return res.status(201).json({
          success: true,
          message: "Usuário criado com sucesso"
        });
      }
    );

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro interno"
    });
  }
};

const login = (req, res) => {

  const { email, senha } = req.body;

  db.get(
    `
    SELECT * FROM users WHERE email = ?
    `,
    [email],
    async (err, user) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Erro interno"
        });
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado"
        });
      }

      const senhaValida = await bcrypt.compare(
        senha,
        user.senha_hash
      );

      if (!senhaValida) {
        return res.status(401).json({
          success: false,
          message: "Senha inválida"
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d"
        }
      );

      return res.status(200).json({
        success: true,
        message: "Login realizado",
        token
      });

    }
  );
};

module.exports = {
  register,
  login
};