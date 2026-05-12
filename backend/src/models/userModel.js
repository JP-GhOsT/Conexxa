const db = require("../database/connection");

/* =========================
   CREATE TABLE USERS
========================= */
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      nome_completo TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Índice opcional para buscas rápidas por email
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users (email)
  `);
});

module.exports = db;