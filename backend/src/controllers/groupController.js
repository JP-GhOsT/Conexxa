const db = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

// Criar grupo
const createStudyGroup = (req, res) => {
  try {
    const { subject, objective, locationType, participantLimit } = req.body;

    if (!subject || subject.trim() === "") {
      return res.status(400).json({ success: false, message: "Subject é obrigatório" });
    }
    if (!objective || objective.trim() === "") {
      return res.status(400).json({ success: false, message: "Objective é obrigatório" });
    }

    const validLocationTypes = ["ONLINE", "PRESENTIAL"];
    if (!locationType || !validLocationTypes.includes(locationType)) {
      return res.status(400).json({ success: false, message: "locationType deve ser ONLINE ou PRESENTIAL" });
    }

    if (!participantLimit || participantLimit <= 0) {
      return res.status(400).json({ success: false, message: "participantLimit deve ser maior que 0" });
    }

    const id = uuidv4();
    const creator_id = "temp-user-id"; // depois virá do JWT

    db.run(
      `
      INSERT INTO groups (
        id,
        subject,
        objective,
        location_type,
        participant_limit,
        creator_id
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [id, subject, objective, locationType, participantLimit, creator_id],
      function (err) {
        if (err) {
          return res.status(500).json({ success: false, message: "Erro ao criar grupo" });
        }

        return res.status(201).json({
          success: true,
          message: "Grupo criado com sucesso",
          group: { id, subject, objective, locationType, participantLimit, creator_id },
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro interno" });
  }
};

// Atualizar grupo
const updateStudyGroup = (req, res) => {
  try {
    const { id } = req.params;
    const { subject, objective, locationType, participantLimit } = req.body;

    if (!subject || subject.trim() === "") {
      return res.status(400).json({ success: false, message: "Subject é obrigatório" });
    }
    if (!objective || objective.trim() === "") {
      return res.status(400).json({ success: false, message: "Objective é obrigatório" });
    }

    const validLocationTypes = ["ONLINE", "PRESENTIAL"];
    if (!locationType || !validLocationTypes.includes(locationType)) {
      return res.status(400).json({ success: false, message: "locationType deve ser ONLINE ou PRESENTIAL" });
    }

    if (!participantLimit || participantLimit <= 0) {
      return res.status(400).json({ success: false, message: "participantLimit deve ser maior que 0" });
    }

    db.run(
      `
      UPDATE groups
      SET subject = ?, objective = ?, location_type = ?, participant_limit = ?
      WHERE id = ?
      `,
      [subject, objective, locationType, participantLimit, id],
      function (err) {
        if (err) {
          return res.status(500).json({ success: false, message: "Erro ao atualizar grupo" });
        }

        if (this.changes === 0) {
          return res.status(404).json({ success: false, message: "Grupo não encontrado" });
        }

        return res.status(200).json({
          success: true,
          message: "Grupo atualizado com sucesso",
          group: { id, subject, objective, locationType, participantLimit },
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro interno" });
  }
};

// Solicitar entrada no grupo
const requestJoinGroup = (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = "temp-user-id"; // depois virá do JWT

    return res.status(200).json({
      success: true,
      message: "Solicitação de entrada enviada",
      data: { groupId, userId, status: "PENDING" },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro ao solicitar entrada" });
  }
};

module.exports = {
  createStudyGroup,
  updateStudyGroup,
  requestJoinGroup,
};
