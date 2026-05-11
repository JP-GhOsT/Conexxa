const db = require("../database/connection");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      nome_completo TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha_hash TEXT NOT NULL,
      subject TEXT NOT NULL,
      objective TEXT NOT NULL,
      location_type TEXT NOT NULL CHECK(location_type IN ('ONLINE','PRESENTIAL')),
      participant_limit INTEGER NOT NULL CHECK(participant_limit > 0),
      creator_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Índice obrigatório em creator_id
  db.run(`CREATE INDEX IF NOT EXISTS idx_users_creator_id ON users (creator_id)`);

  // Índice opcional em subject para buscas futuras
  db.run(`CREATE INDEX IF NOT EXISTS idx_users_subject ON users (subject)`);
});

module.exports = db;
