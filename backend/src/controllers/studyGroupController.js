// backend/src/controllers/studyGroupController.js
const db = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

<<<<<<< HEAD
const MAX_PARTICIPANT_LIMIT = 100;
const validLocationTypes = ["ONLINE", "PRESENTIAL"];

// Criar grupo (se já não existir, opcional)
const createStudyGroup = (req, res) => {
  // ...implemente ou mantenha a função de criação aqui
};

// Atualizar grupo (PUT /study-groups/:id)
const updateStudyGroup = (req, res) => {
  try {
    const { id } = req.params;
    const { subject, objective, locationType, participantLimit } = req.body;

    // Validações iguais à criação
    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, message: "subject é obrigatório" });
    }
    if (!objective || !objective.trim()) {
      return res.status(400).json({ success: false, message: "objective é obrigatório" });
    }
    if (!locationType || !validLocationTypes.includes(locationType)) {
      return res.status(400).json({ success: false, message: "locationType deve ser ONLINE ou PRESENTIAL" });
    }
    const limit = Number(participantLimit);
    if (Number.isNaN(limit) || limit <= 0) {
      return res.status(400).json({ success: false, message: "participantLimit deve ser maior que 0" });
    }
    if (limit > MAX_PARTICIPANT_LIMIT) {
      return res.status(400).json({ success: false, message: `participantLimit deve ser no máximo ${MAX_PARTICIPANT_LIMIT}` });
    }

    // Verifica se o grupo existe e quem é o criador
    db.get(
      `SELECT id, creator_id FROM groups WHERE id = ?`,
      [id],
      (err, row) => {
        if (err) return res.status(500).json({ success: false, message: "Erro ao buscar grupo" });
        if (!row) return res.status(404).json({ success: false, message: "Grupo não encontrado" });

        const creatorId = row.creator_id;
        const userId = req.user && req.user.id; // authMiddleware deve popular req.user.id

        if (!userId) {
          return res.status(401).json({ success: false, message: "Usuário não autenticado" });
        }

        if (creatorId !== userId) {
          return res.status(403).json({ success: false, message: "Apenas o criador do grupo pode editar" });
        }

        // Se passou nas validações e é o criador, atualiza
        db.run(
          `UPDATE groups SET subject = ?, objective = ?, location_type = ?, participant_limit = ? WHERE id = ?`,
          [subject, objective, locationType, limit, id],
          function (updateErr) {
            if (updateErr) return res.status(500).json({ success: false, message: "Erro ao atualizar grupo" });
            if (this.changes === 0) return res.status(404).json({ success: false, message: "Grupo não encontrado" });

            const updated = { id, subject, objective, locationType, participantLimit: limit, creator_id: creatorId };
            return res.status(200).json({ success: true, message: "Grupo atualizado com sucesso", group: updated });
          }
        );
=======
const MAX_LIMIT = 100;
const validTypes = ["ONLINE", "PRESENTIAL"];

/* =========================
   CREATE GROUP
========================= */
const createStudyGroup = (req, res) => {
  const { subject, objective, locationType, participantLimit } = req.body;

  if (!subject || !subject.trim() || !objective || !objective.trim()) {
    return res.status(400).json({ message: "Campos obrigatórios" });
  }

  if (!validTypes.includes(locationType)) {
    return res.status(400).json({ message: "locationType inválido" });
  }

  const limit = Number(participantLimit);

  if (!limit || limit <= 0 || limit > MAX_LIMIT) {
    return res.status(400).json({ message: "Limite inválido" });
  }

  const id = uuidv4();
  const creator_id = req.user?.id || "temp-user";

  db.run(
    `INSERT INTO groups (id, subject, objective, location_type, participant_limit, creator_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, subject, objective, locationType, limit, creator_id],
    function (err) {
      if (err) {
        console.log("SQL ERROR:", err);
        return res.status(500).json({
          message: "Erro ao criar grupo",
          error: err.message
        });
      }

      return res.status(201).json({
        success: true,
        group: {
          id,
          subject,
          objective,
          locationType,
          participantLimit: limit,
          creator_id
        }
      });
    }
  );
};

/* =========================
   UPDATE GROUP
========================= */
const updateStudyGroup = (req, res) => {
  const { id } = req.params;
  const { subject, objective, locationType, participantLimit } = req.body;

  const limit = Number(participantLimit);

  db.run(
    `UPDATE groups
     SET subject = ?, objective = ?, location_type = ?, participant_limit = ?
     WHERE id = ?`,
    [subject, objective, locationType, limit, id],
    function (err) {
      if (err) {
        console.log("SQL ERROR:", err);
        return res.status(500).json({
          message: "Erro ao atualizar",
          error: err.message
        });
>>>>>>> b409e0e4caa9b76a8c7f849762ced7ebecdcfe78
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Grupo não encontrado" });
      }

      return res.json({
        success: true,
        message: "Atualizado com sucesso"
      });
    }
  );
};

/* =========================
   JOIN REQUEST
========================= */
const requestJoinGroup = (req, res) => {
  const { groupId } = req.params;
  const userId = req.user?.id || "temp-user";

  db.get(
    `SELECT * FROM group_memberships 
     WHERE group_id = ? AND user_id = ?`,
    [groupId, userId],
    (err, row) => {
      if (err) {
        console.log("SQL ERROR:", err);
        return res.status(500).json({ message: "Erro interno" });
      }

      if (row) {
        return res.status(400).json({
          message: "Já solicitou ou já é membro"
        });
      }

      db.run(
        `INSERT INTO group_memberships (id, group_id, user_id, status)
         VALUES (?, ?, ?, ?)`,
        [uuidv4(), groupId, userId, "PENDING"],
        function (err2) {
          if (err2) {
            console.log("SQL ERROR:", err2);
            return res.status(500).json({
              message: "Erro ao solicitar entrada",
              error: err2.message
            });
          }

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
<<<<<<< HEAD
  // exporte outras funções se existirem
};
// backend/src/routes/studyGroupRoutes.js
const express = require("express");
const router = express.Router();
const studyGroupController = require("../controllers/studyGroupController");
const authMiddleware = require("../middlewares/authMiddleware");

router.put("/study-groups/:id", authMiddleware, studyGroupController.updateStudyGroup);

// adicione outras rotas aqui, ex:
// router.post("/usuarios/cadastro", studyGroupController.createStudyGroup);

module.exports = router;
=======
  requestJoinGroup
};
>>>>>>> b409e0e4caa9b76a8c7f849762ced7ebecdcfe78
