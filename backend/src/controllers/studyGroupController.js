const db = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

// Limite máximo opcional
const MAX_PARTICIPANT_LIMIT = 100;
const validLocationTypes = ["ONLINE", "PRESENTIAL"];

const registerGroup = (req, res) => {
  try {
    const { subject, objective, locationType, participantLimit, creator_id } = req.body;

    // Validações obrigatórias
    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, message: "subject é obrigatório" });
    }
    if (!objective || !objective.trim()) {
      return res.status(400).json({ success: false, message: "objective é obrigatório" });
    }

    // Validar enum locationType
    if (!locationType || !validLocationTypes.includes(locationType)) {
      return res.status(400).json({ success: false, message: "locationType deve ser ONLINE ou PRESENTIAL" });
    }

    // Validar participantLimit
    if (participantLimit === undefined || participantLimit === null) {
      return res.status(400).json({ success: false, message: "participantLimit é obrigatório" });
    }
    const limit = Number(participantLimit);
    if (Number.isNaN(limit) || limit <= 0) {
      return res.status(400).json({ success: false, message: "participantLimit deve ser maior que 0" });
    }
    if (limit > MAX_PARTICIPANT_LIMIT) {
      return res.status(400).json({ success: false, message: `participantLimit deve ser no máximo ${MAX_PARTICIPANT_LIMIT}` });
    }

    // Criar e salvar
    const id = uuidv4();
    const creator = creator_id || "temp-user-id";

    db.run(
      `INSERT INTO groups (id, subject, objective, location_type, participant_limit, creator_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, subject, objective, locationType, limit, creator],
      function (err) {
        if (err) {
          return res.status(500).json({ success: false, message: "Erro ao salvar grupo" });
        }

        // Retorna o objeto criado com ID
        const created = {
          id,
          subject,
          objective,
          locationType,
          participantLimit: limit,
          creator_id: creator
        };

        return res.status(201).json({ success: true, group: created });
      }
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro interno" });
  }
};

module.exports = {
  registerGroup,
};
