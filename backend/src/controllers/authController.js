const db = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const register = async (req, res) => {

  try {

    const { nome_completo, email, senha } = req.body;

    // VALIDAR NOME
    if (!nome_completo || nome_completo.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Nome é obrigatório"
      });
    }

    // VALIDAR EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "E-mail inválido"
      });
    }

    // VALIDAR SENHA
    const senhaSegura =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!senha || !senhaSegura.test(senha)) {
      return res.status(400).json({
        success: false,
        message:
          "A senha deve ter no mínimo 8 caracteres, uma letra e um número"
      });
    }

    // VERIFICAR SE EMAIL JÁ EXISTE
    db.get(
      `
      SELECT * FROM users WHERE email = ?
      `,
      [email],
      async (err, existingUser) => {

        if (err) {
          return res.status(500).json({
            success: false,
            message: "Erro interno"
          });
        }

        // EMAIL JÁ EXISTE
        if (existingUser) {
          return res.status(409).json({
            success: false,
            message: "E-mail já cadastrado"
          });
        }

        // HASH DA SENHA
        const senha_hash = await bcrypt.hash(
          senha,
          10
        );

        const id = uuidv4();

        // CRIAR USUÁRIO
        db.run(
          `
          INSERT INTO users (
            id,
            nome_completo,
            email,
            senha_hash
          )
          VALUES (?, ?, ?, ?)
          `,
          [
            id,
            nome_completo,
            email,
            senha_hash
          ],
          function (insertErr) {

            if (insertErr) {
              return res.status(500).json({
                success: false,
                message: "Erro ao criar usuário"
              });
            }

            // GERAR JWT
            const token = jwt.sign(
              {
                id,
                email
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "1d"
              }
            );

            // RETORNAR TOKEN + DADOS
            return res.status(201).json({
              success: true,
              message: "Usuário criado com sucesso",
              token,
              user: {
                id,
                nome_completo,
                email
              }
            });

          }
        );

      }
    );

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Erro interno"
    });

  }

};

const login = (req, res) => {

  const { email, senha } = req.body;

  // VALIDAR CAMPOS
  if (!email || !senha) {

    return res.status(400).json({
      success: false,
      message: "E-mail e senha são obrigatórios"
    });

  }

  // BUSCAR USUÁRIO
  db.get(
    `
    SELECT * FROM users
    WHERE email = ?
    `,
    [email],
    async (err, user) => {

      if (err) {

        return res.status(500).json({
          success: false,
          message: "Erro interno"
        });

      }

      // USUÁRIO NÃO EXISTE
      if (!user) {

        return res.status(401).json({
          success: false,
          message: "E-mail ou senha inválidos"
        });

      }

      // COMPARAR SENHA
      const senhaValida =
        await bcrypt.compare(
          senha,
          user.senha_hash
        );

      // SENHA ERRADA
      if (!senhaValida) {

        return res.status(401).json({
          success: false,
          message: "E-mail ou senha inválidos"
        });

      }

      // GERAR TOKEN
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

      // RETORNAR
      return res.json({
        success: true,
        token,
        user: {
          id: user.id,
          nome_completo:
            user.nome_completo,
          email: user.email
        }
      });

    }
  );

};

module.exports = {
  register,
  login
};