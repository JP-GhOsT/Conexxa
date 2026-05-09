const db = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

/* =========================
   CRIAR GRUPO
========================= */
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
    if (!validLocationTypes.includes(locationType)) {
      return res.status(400).json({ success: false, message: "Location inválido" });
    }

    if (!participantLimit || participantLimit <= 0) {
      return res.status(400).json({ success: false, message: "Limite inválido" });
    }

    const id = uuidv4();
    const creator_id = req.user?.id || "temp-user";

    db.run(
      `
      INSERT INTO groups (id, subject, objective, location_type, participant_limit, creator_id)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [id, subject, objective, locationType, participantLimit, creator_id],
      function (err) {
        if (err) {
          console.log("SQL ERROR:", err);
          return res.status(500).json({ success: false, message: "Erro ao criar grupo" });
        }

        return res.status(201).json({
          success: true,
          message: "Grupo criado com sucesso",
          group: { id, subject, objective, locationType, participantLimit }
        });
      }
    );
  } catch (error) {
    console.log("ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   ATUALIZAR GRUPO
========================= */
const updateStudyGroup = (req, res) => {
  const { id } = req.params;
  const { subject, objective, locationType, participantLimit } = req.body;

  db.run(
    `
    UPDATE groups
    SET subject = ?, objective = ?, location_type = ?, participant_limit = ?
    WHERE id = ?
    `,
    [subject, objective, locationType, participantLimit, id],
    function (err) {
      if (err) {
        console.log("SQL ERROR:", err);
        return res.status(500).json({ success: false, message: "Erro ao atualizar" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ success: false, message: "Grupo não encontrado" });
      }

      return res.json({ success: true, message: "Grupo atualizado" });
    }
  );
};

/* =========================
   JOIN REQUEST (CORRIGIDO)
   usa: group_memberships
========================= */
const requestJoinGroup = (req, res) => {
  const { groupId } = req.params;
  const userId = req.user?.id || "temp-user";

  // 1. já é membro?
  db.get(
    `SELECT * FROM group_memberships WHERE group_id = ? AND user_id = ?`,
    [groupId, userId],
    (err, member) => {
      if (err) {
        console.log("SQL ERROR:", err);
        return res.status(500).json({ success: false, message: "Erro interno" });
      }

      if (member) {
        return res.status(400).json({ success: false, message: "Já é membro ou já solicitou" });
      }

      // 2. criar request
      db.run(
        `
        INSERT INTO group_memberships (id, group_id, user_id, status)
        VALUES (?, ?, ?, ?)
        `,
        [uuidv4(), groupId, userId, "PENDING"],
        function (err2) {
          if (err2) {
            console.log("SQL ERROR:", err2);
            return res.status(500).json({ success: false, message: "Erro ao solicitar entrada" });
          }

          console.log(`🔔 Pedido de entrada: ${userId} -> ${groupId}`);

          return res.status(201).json({
            success: true,
            message: "Solicitação enviada",
            data: {
              groupId,
              userId,
              status: "PENDING"
            }
          });
        }
      );
    }
  );
};

module.exports = {
  createStudyGroup,
  updateStudyGroup,
  requestJoinGroup
};