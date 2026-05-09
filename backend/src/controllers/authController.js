const db = require("../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

/* =========================
   REGISTER
========================= */
const register = (req, res) => {
  const { nomeCompleto, email, senha } = req.body;

  if (!nomeCompleto || !email || !senha) {
    return res.status(400).json({ message: "Campos obrigatórios" });
  }

  db.get(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (err) {
        console.log("SQL ERROR:", err);
        return res.status(500).json({
          message: "Erro no banco",
          error: err.message
        });
      }

      if (user) {
        return res.status(409).json({ message: "Email já cadastrado" });
      }

      const id = uuidv4();
      const hashedPassword = await bcrypt.hash(senha, 10);

      db.run(
        `INSERT INTO users (id, nome_completo, email, senha_hash)
         VALUES (?, ?, ?, ?)`,
        [id, nomeCompleto, email, hashedPassword],
        function (insertErr) {
          if (insertErr) {
            console.log("SQL ERROR REGISTER:", insertErr);
            return res.status(500).json({
              message: "Erro ao criar usuário",
              error: insertErr.message
            });
          }

          return res.status(201).json({
            success: true,
            user: {
              id,
              nomeCompleto,
              email
            }
          });
        }
      );
    }
  );
};

/* =========================
   LOGIN
========================= */
const login = (req, res) => {
  const { email, senha } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (err) {
        console.log("SQL ERROR:", err);
        return res.status(500).json({
          message: "Erro no banco",
          error: err.message
        });
      }

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const valid = await bcrypt.compare(senha, user.senha_hash);

      if (!valid) {
        return res.status(401).json({ message: "Senha inválida" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        success: true,
        token
      });
    }
  );
};

module.exports = {
  register,
  login
};