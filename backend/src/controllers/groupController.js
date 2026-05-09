const db = require("../database/connection");

const { v4: uuidv4 } = require("uuid");

const createStudyGroup = (req, res) => {

  try {

    const {
      subject,
      objective,
      locationType,
      participantLimit
    } = req.body;

    // VALIDAÇÕES

    if (
      !subject ||
      subject.trim() === ""
    ) {

      return res.status(400).json({
        success: false,
        message: "Subject é obrigatório"
      });

    }

    if (
      !objective ||
      objective.trim() === ""
    ) {

      return res.status(400).json({
        success: false,
        message: "Objective é obrigatório"
      });

    }

    // VALIDAR LOCATION TYPE
    const validLocationTypes = [
      "ONLINE",
      "PRESENTIAL"
    ];

    if (
      !locationType ||
      !validLocationTypes.includes(
        locationType
      )
    ) {

      return res.status(400).json({
        success: false,
        message:
          "locationType deve ser ONLINE ou PRESENTIAL"
      });

    }

    // VALIDAR LIMITE
    if (
      !participantLimit ||
      participantLimit <= 0
    ) {

      return res.status(400).json({
        success: false,
        message:
          "participantLimit deve ser maior que 0"
      });

    }

    const id = uuidv4();

    // TEMPORÁRIO
    // depois virá do JWT
    const creator_id =
      "temp-user-id";

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
            success: false,
            message:
              "Erro ao criar grupo"
          });

        }

        return res.status(201).json({
          success: true,
          message:
            "Grupo criado com sucesso",
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

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Erro interno"
    });

  }

};

const requestJoinGroup = (req, res) => {
  try {
    const { groupId } = req.params;

    // TEMPORÁRIO (vai vir do JWT depois)
    const userId = "temp-user-id";

    return res.status(200).json({
      success: true,
      message: "Solicitação de entrada enviada",
      data: {
        groupId,
        userId,
        status: "PENDING"
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao solicitar entrada"
    });
  }
};

module.exports = {
  createStudyGroup,
  requestJoinGroup
};