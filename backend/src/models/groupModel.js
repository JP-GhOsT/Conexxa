const db = require("../database/connection");

db.serialize(() => {

  db.run(`

    CREATE TABLE IF NOT EXISTS groups (

      id TEXT PRIMARY KEY,

      subject TEXT NOT NULL,

      objective TEXT NOT NULL,

      location_type TEXT NOT NULL
      CHECK(location_type IN ('ONLINE', 'PRESENTIAL')),

      participant_limit INTEGER NOT NULL
      CHECK(participant_limit > 0),

      creator_id TEXT NOT NULL,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (creator_id)
      REFERENCES users(id)

    )

  `);

});

module.exports = db;