// backend/src/controllers/studyGroupController.js

const db = require("../database/connection");

const { v4: uuidv4 } = require("uuid");

const MAX_LIMIT = 100;

const validTypes = [
  "ONLINE",
  "PRESENTIAL"
];

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

  // VALIDAÇÕES
  if (
    !subject ||
    !subject.trim() ||
    !objective ||
    !objective.trim()
  ) {

    return res.status(400).json({
      message: "Campos obrigatórios"
    });

  }

  if (!validTypes.includes(locationType)) {

    return res.status(400).json({
      message: "locationType inválido"
    });

  }

  const limit =
    Number(participantLimit);

  if (
    !limit ||
    limit <= 0 ||
    limit > MAX_LIMIT
  ) {

    return res.status(400).json({
      message: "Limite inválido"
    });

  }

  const id = uuidv4();

  const creator_id =
    req.user?.id;

  db.run(

    `INSERT INTO groups
    (
      id,
      subject,
      objective,
      location_type,
      participant_limit,
      creator_id
    )

    VALUES (?, ?, ?, ?, ?, ?)`,

    [
      id,
      subject,
      objective,
      locationType,
      limit,
      creator_id
    ],

    function (err) {

      if (err) {

        console.log(
          "SQL ERROR:",
          err
        );

        return res.status(500).json({

          message:
            "Erro ao criar grupo",

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
   GET GROUP BY ID
========================= */
const getStudyGroupById = (req, res) => {

  const { id } = req.params;

  db.get(

    `SELECT * FROM groups WHERE id = ?`,

    [id],

    (err, group) => {

      if (err) {

        console.log(
          "SQL ERROR:",
          err
        );

        return res.status(500).json({

          message:
            "Erro ao buscar grupo",

          error: err.message

        });

      }

      if (!group) {

        return res.status(404).json({
          message:
            "Grupo não encontrado"
        });

      }

      return res.json({

        success: true,

        group: {

          id: group.id,

          subject: group.subject,

          objective: group.objective,

          locationType:
            group.location_type,

          participantLimit:
            group.participant_limit,

          creator_id:
            group.creator_id

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

  const {
    subject,
    objective,
    locationType,
    participantLimit
  } = req.body;

  // VALIDAÇÕES
  if (
    !subject ||
    !subject.trim() ||
    !objective ||
    !objective.trim()
  ) {

    return res.status(400).json({
      message: "Campos obrigatórios"
    });

  }

  if (!validTypes.includes(locationType)) {

    return res.status(400).json({
      message: "locationType inválido"
    });

  }

  const limit =
    Number(participantLimit);

  if (
    !limit ||
    limit <= 0 ||
    limit > MAX_LIMIT
  ) {

    return res.status(400).json({
      message: "Limite inválido"
    });

  }

  // VERIFICAR DONO DO GRUPO
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

      // APENAS O CRIADOR PODE EDITAR
      if (group.creator_id !== req.user.id) {

        return res.status(403).json({
          message:
            "Apenas o criador pode editar o grupo"
        });

      }

      db.run(

        `UPDATE groups

         SET
           subject = ?,
           objective = ?,
           location_type = ?,
           participant_limit = ?

         WHERE id = ?`,

        [
          subject,
          objective,
          locationType,
          limit,
          id
        ],

        function (updateErr) {

          if (updateErr) {

            console.log(
              "SQL ERROR:",
              updateErr
            );

            return res.status(500).json({

              message:
                "Erro ao atualizar",

              error:
                updateErr.message

            });

          }

          return res.json({

            success: true,

            message:
              "Atualizado com sucesso"

          });

        }

      );

    }

  );

};

/* =========================
   JOIN REQUEST
========================= */
const requestJoinGroup = (req, res) => {

  const { groupId } = req.params;

  const userId =
    req.user?.id;

  db.get(

    `SELECT * FROM group_memberships

     WHERE group_id = ?
     AND user_id = ?`,

    [
      groupId,
      userId
    ],

    (err, row) => {

      if (err) {

        console.log(
          "SQL ERROR:",
          err
        );

        return res.status(500).json({
          message: "Erro interno"
        });

      }

      if (row) {

        return res.status(400).json({

          message:
            "Já solicitou ou já é membro"

        });

      }

      db.run(

        `INSERT INTO group_memberships
        (
          id,
          group_id,
          user_id,
          status
        )

        VALUES (?, ?, ?, ?)`,

        [
          uuidv4(),
          groupId,
          userId,
          "PENDING"
        ],

        function (err2) {

          if (err2) {

            console.log(
              "SQL ERROR:",
              err2
            );

            return res.status(500).json({

              message:
                "Erro ao solicitar entrada",

              error:
                err2.message

            });

          }

          return res.status(201).json({

            success: true,

            message:
              "Solicitação enviada",

            data: {

              groupId,

              userId,

              status:
                "PENDING"

            }

          });

        }

      );

    }

  );

};

module.exports = {

  createStudyGroup,

  getStudyGroupById,

  updateStudyGroup,

  requestJoinGroup

};