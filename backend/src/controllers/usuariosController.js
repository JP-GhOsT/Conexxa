const db = require("../database/connection"); // ou prisma client se usar Prisma
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs"); // opcional, recomendado

const MAX_PARTICIPANT_LIMIT = 100;

const registerUser = async (req, res) => {
  try {
    const { nomeCompleto, email, senha, locationType, participantLimit } = req.body;

    // campos obrigatórios
    if (!nomeCompleto || nomeCompleto.trim() === "") {
      return res.status(400).json({ success: false, message: "Nome completo é obrigatório" });
    }
    if (!email || email.trim() === "") {
      return res.status(400).json({ success: false, message: "Email é obrigatório" });
    }
    if (!senha || senha.trim() === "") {
      return res.status(400).json({ success: false, message: "Senha é obrigatória" });
    }

    // validar enum locationType (opcional)
    const validLocationTypes = ["ONLINE", "PRESENTIAL"];
    if (locationType && !validLocationTypes.includes(locationType)) {
      return res.status(400).json({ success: false, message: "locationType deve ser ONLINE ou PRESENTIAL" });
    }

    // validar participantLimit (opcional)
    if (participantLimit !== undefined && participantLimit !== null) {
      const limit = Number(participantLimit);
      if (Number.isNaN(limit) || limit <= 0) {
        return res.status(400).json({ success: false, message: "participantLimit deve ser maior que 0" });
      }
      if (limit > MAX_PARTICIPANT_LIMIT) {
        return res.status(400).json({ success: false, message: `participantLimit deve ser no máximo ${MAX_PARTICIPANT_LIMIT}` });
      }
    }

    // checar se email já existe (exemplo com sqlite db.get)
    db.get("SELECT id FROM usuarios WHERE email = ?", [email], async (err, row) => {
      if (err) return res.status(500).json({ success: false, message: "Erro ao verificar usuário" });
      if (row) return res.status(409).json({ success: false, message: "Email já cadastrado" });

      const id = uuidv4();
      const hashedPassword = await bcrypt.hash(senha, 10);

      db.run(
        `INSERT INTO usuarios (id, nome_completo, email, senha, location_type, participant_limit)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, nomeCompleto, email, hashedPassword, locationType || null, participantLimit || null],
        function (insertErr) {
          if (insertErr) return res.status(500).json({ success: false, message: "Erro ao cadastrar usuário" });

          return res.status(201).json({
            success: true,
            message: "Usuário cadastrado com sucesso",
            user: { id, nomeCompleto, email, locationType: locationType || null, participantLimit: participantLimit || null }
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro interno" });
  }
};

module.exports = {
  registerUser,
};
