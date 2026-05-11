const db = require("../database/connection");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

/* =========================
   REGISTER
========================= */
const register = (req, res) => {

  const {
    nomeCompleto,
    email,
    senha
  } = req.body;

  // VALIDAÇÃO
  if (
    !nomeCompleto ||
    !email ||
    !senha
  ) {

    return res.status(400).json({
      message: "Campos obrigatórios"
    });

  }

  // VERIFICAR EMAIL
  db.get(

    "SELECT id FROM users WHERE email = ?",

    [email],

    async (err, user) => {

      if (err) {

        console.log(
          "SQL ERROR:",
          err
        );

        return res.status(500).json({

          message:
            "Erro no banco",

          error:
            err.message

        });

      }

      // EMAIL EXISTE
      if (user) {

        return res.status(409).json({

          message:
            "Email já cadastrado"

        });

      }

      // HASH SENHA
      const hashedPassword =
        await bcrypt.hash(
          senha,
          10
        );

      // UUID
      const id = uuidv4();

      // INSERT
      db.run(

        `INSERT INTO users
        (
          id,
          nome_completo,
          email,
          senha_hash
        )

        VALUES (?, ?, ?, ?)`,

        [
          id,
          nomeCompleto,
          email,
          hashedPassword
        ],

        function (insertErr) {

          if (insertErr) {

            console.log(
              "SQL ERROR REGISTER:",
              insertErr
            );

            return res.status(500).json({

              message:
                "Erro ao criar usuário",

              error:
                insertErr.message

            });

          }

          return res.status(201).json({

            success: true,

            user: {

              id,

              nomeCompleto,

              email

            }

          });

        }

      );

    }

  );

};

/* =========================
   LOGIN
========================= */
const login = (req, res) => {

  const {
    email,
    senha
  } = req.body;

  db.get(

    "SELECT * FROM users WHERE email = ?",

    [email],

    async (err, user) => {

      if (err) {

        console.log(
          "SQL ERROR:",
          err
        );

        return res.status(500).json({

          message:
            "Erro no banco",

          error:
            err.message

        });

      }

      // USUÁRIO NÃO EXISTE
      if (!user) {

        return res.status(404).json({

          message:
            "Usuário não encontrado"

        });

      }

      // VALIDAR SENHA
      const valid =
        await bcrypt.compare(
          senha,
          user.senha_hash
        );

      if (!valid) {

        return res.status(401).json({

          message:
            "Senha inválida"

        });

      }

      // TOKEN
      const token = jwt.sign(

        {
          id: user.id,
          email: user.email
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "1d"
        }

      );

      // RESPOSTA
      return res.json({

        success: true,

        token,

        user: {

          id: user.id,

          nomeCompleto:
            user.nome_completo,

          email:
            user.email

        }

      });

    }

  );

};

/* =========================
   EXPORTS
========================= */
module.exports = {

  register,

  login

};