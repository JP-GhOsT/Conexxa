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
      location_type TEXT NOT NULL CHECK(location_type IN ('ONLINE', 'PRESENTIAL')),
      participant_limit INTEGER NOT NULL CHECK(participant_limit > 0),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
