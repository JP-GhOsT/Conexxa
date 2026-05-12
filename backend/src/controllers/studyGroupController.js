const db = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

const STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED"
};

/* =========================
   CREATE GROUP
========================= */
const createStudyGroup = (req, res) => {
  const {
    subject,
    objective,
    locationType,
    participantLimit
  } = req.body;

  const creator_id = req.user?.id;

  if (!subject || !objective) {
    return res.status(400).json({
      message: "Campos obrigatórios"
    });
  }

  const id = uuidv4();

  db.run(
    `INSERT INTO groups 
     (id, subject, objective, location_type, participant_limit, creator_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      id,
      subject,
      objective,
      locationType,
      participantLimit,
      creator_id
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: "Erro ao criar grupo"
        });
      }

      return res.status(201).json({
        success: true,
        group: {
          id,
          subject,
          objective,
          locationType,
          participantLimit,
          creator_id
        }
      });
    }
  );
};

/* =========================
   GET ALL GROUPS (🔥 NOVO)
========================= */
const getAllStudyGroups = (req, res) => {
  db.all(
    `SELECT * FROM groups ORDER BY created_at DESC`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao buscar grupos"
        });
      }

      return res.json({
        success: true,
        groups: rows
      });
    }
  );
};

/* =========================
   GET GROUP BY ID
========================= */
const getStudyGroupById = (req, res) => {
  const { id } = req.params;

  db.get(
    `SELECT * FROM groups WHERE id = ?`,
    [id],
    (err, group) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao buscar grupo"
        });
      }

      if (!group) {
        return res.status(404).json({
          message: "Grupo não encontrado"
        });
      }

      return res.json({
        success: true,
        group
      });
    }
  );
};

/* =========================
   UPDATE GROUP
========================= */
const updateStudyGroup = (req, res) => {
  const { id } = req.params;
  const {
    subject,
    objective,
    locationType,
    participantLimit
  } = req.body;

  db.run(
    `UPDATE groups 
     SET subject = ?, objective = ?, location_type = ?, participant_limit = ?
     WHERE id = ?`,
    [subject, objective, locationType, participantLimit, id],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: "Erro ao atualizar grupo"
        });
      }

      return res.json({
        success: true,
        message: "Atualizado com sucesso"
      });
    }
  );
};

/* =========================
   REQUEST JOIN GROUP
========================= */
const requestJoinGroup = (req, res) => {
  const { groupId } = req.params;
  const userId = req.user?.id;

  db.get(
    `SELECT * FROM group_memberships 
     WHERE group_id = ? AND user_id = ?`,
    [groupId, userId],
    (err, row) => {
      if (row) {
        return res.json({
          status: row.status,
          message: "Já existe solicitação"
        });
      }

      db.run(
        `INSERT INTO group_memberships 
         (id, group_id, user_id, status)
         VALUES (?, ?, ?, ?)`,
        [uuidv4(), groupId, userId, STATUS.PENDING],
        function (err2) {
          if (err2) {
            return res.status(500).json({
              message: "Erro ao solicitar entrada"
            });
          }

          return res.status(201).json({
            status: STATUS.PENDING
          });
        }
      );
    }
  );
};

/* =========================
   GET JOIN STATUS
========================= */
const getJoinRequestStatus = (req, res) => {
  const { groupId } = req.params;
  const userId = req.user?.id;

  db.get(
    `SELECT status FROM group_memberships 
     WHERE group_id = ? AND user_id = ?`,
    [groupId, userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          message: "Erro interno"
        });
      }

      if (!row) {
        return res.json({
          status: "NONE"
        });
      }

      return res.json({
        status: row.status
      });
    }
  );
};

/* =========================
   ACCEPT JOIN REQUEST (ADMIN)
========================= */
const acceptJoinRequest = (req, res) => {
  const { groupId, userId } = req.params;
  const adminId = req.user?.id;

  // 1. Verificar se o grupo existe e se o usuário é admin
  db.get(
    `SELECT * FROM groups WHERE id = ?`,
    [groupId],
    (err, group) => {
      if (err) {
        return res.status(500).json({ message: "Erro interno" });
      }

      if (!group) {
        return res.status(404).json({ message: "Grupo não encontrado" });
      }

      if (group.creator_id !== adminId) {
        return res.status(403).json({
          message: "Apenas o criador pode aceitar pedidos"
        });
      }

      // 2. Atualizar status para ACCEPTED
      db.run(
        `UPDATE group_memberships
         SET status = ?, updated_at = CURRENT_TIMESTAMP
         WHERE group_id = ? AND user_id = ?`,
        ["ACCEPTED", groupId, userId],
        function (err2) {
          if (err2) {
            return res.status(500).json({
              message: "Erro ao aceitar pedido"
            });
          }

          return res.json({
            success: true,
            message: "Usuário aceito no grupo"
          });
        }
      );
    }
  );
};

const rejectJoinRequest = (req, res) => {
  const { groupId, userId } = req.params;
  const adminId = req.user?.id;

  // 1. verificar grupo
  db.get(
    `SELECT * FROM groups WHERE id = ?`,
    [groupId],
    (err, group) => {
      if (err) {
        return res.status(500).json({ message: "Erro interno" });
      }

      if (!group) {
        return res.status(404).json({ message: "Grupo não encontrado" });
      }

      // 2. validar admin
      if (group.creator_id !== adminId) {
        return res.status(403).json({
          message: "Apenas o criador pode rejeitar pedidos"
        });
      }

      // 3. atualizar status pelo userId + groupId (IGUAL accept)
      db.run(
        `UPDATE group_memberships
         SET status = ?, updated_at = CURRENT_TIMESTAMP
         WHERE group_id = ? AND user_id = ?`,
        ["REJECTED", groupId, userId],
        function (err2) {
          if (err2) {
            return res.status(500).json({
              message: "Erro ao rejeitar pedido"
            });
          }

          return res.json({
            success: true,
            message: "Usuário rejeitado no grupo"
          });
        }
      );
    }
  );
};

const getGroupRequests = (req, res) => {
  const { groupId } = req.params;

  db.all(
    `SELECT gm.id, gm.user_id, gm.status, u.nomeCompleto, u.email
     FROM group_memberships gm
     JOIN users u ON u.id = gm.user_id
     WHERE gm.group_id = ? AND gm.status = 'PENDING'`,
    [groupId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao buscar solicitações" });
      }

      return res.json({
        success: true,
        requests: rows
      });
    }
  );
};

/* =========================
   EXPORT
========================= */
module.exports = {
  createStudyGroup,
  getAllStudyGroups, // 🔥 IMPORTANTE
  getStudyGroupById,
  updateStudyGroup,
  requestJoinGroup,
  getJoinRequestStatus,
  acceptJoinRequest,
  rejectJoinRequest,
  getGroupRequests
};