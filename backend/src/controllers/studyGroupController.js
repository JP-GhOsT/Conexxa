// backend/src/controllers/studyGroupController.js
const db = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

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
      }
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro interno" });
  }
};

module.exports = {
  createStudyGroup,
  updateStudyGroup,
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
