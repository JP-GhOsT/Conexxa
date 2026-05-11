const db = require("../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const MAX_PARTICIPANT_LIMIT = 100;

/* =========================
   REGISTER
========================= */
const register = (req, res) => {
  const { nomeCompleto, email, senha, subject, objective, locationType, participantLimit } = req.body;

  // Validações NOT NULL
  if (!nomeCompleto || !email || !senha || !subject || !objective || !locationType || participantLimit === undefined) {
    return res.status(400).json({
      message: "Campos obrigatórios: nomeCompleto, email, senha, subject, objective, locationType, participantLimit"
    });
  }

  // Validação enum locationType
  const validLocationTypes = ["ONLINE", "PRESENTIAL"];
  if (!validLocationTypes.includes(locationType)) {
    return res.status(400).json({ message: "locationType deve ser ONLINE ou PRESENTIAL" });
  }

  // Validação CHECK participant_limit > 0
  const limit = Number(participantLimit);
  if (Number.isNaN(limit) || limit <= 0) {
    return res.status(400).json({ message: "participantLimit deve ser maior que 0" });
  }
  if (limit > MAX_PARTICIPANT_LIMIT) {
    return res.status(400).json({ message: `participantLimit deve ser no máximo ${MAX_PARTICIPANT_LIMIT}` });
  }

  // Verifica se email já existe
  db.get("SELECT id FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) {
      console.log("SQL ERROR:", err);
      return res.status(500).json({ message: "Erro no banco", error: err.message });
    }

    if (user) {
      return res.status(409).json({ message: "Email já cadastrado" });
    }

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(senha, 10);

    db.run(
      `INSERT INTO users (id, nome_completo, email, senha_hash, subject, objective, location_type, participant_limit)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, nomeCompleto, email, hashedPassword, subject, objective, locationType, limit],
      function (insertErr) {
        if (insertErr) {
          console.log("SQL ERROR REGISTER:", insertErr);
          return res.status(500).json({ message: "Erro ao criar usuário", error: insertErr.message });
        }

        return res.status(201).json({
          success: true,
          user: { id, nomeCompleto, email, subject, objective, locationType, participantLimit: limit }
        });
      }
    );
  });
};

/* =========================
   LOGIN
========================= */
const login = (req, res) => {
  const { email, senha } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) {
      console.log("SQL ERROR:", err);
      return res.status(500).json({ message: "Erro no banco", error: err.message });
    }

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const valid = await bcrypt.compare(senha, user.senha_hash);
    if (!valid) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ success: true, token });
  });
};

module.exports = { register, login };
