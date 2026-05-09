const db = require("../database/connection");

db.run(`
  CREATE TABLE IF NOT EXISTS group_memberships (

    id TEXT PRIMARY KEY,

    user_id TEXT NOT NULL,

    group_id TEXT NOT NULL,

    status TEXT NOT NULL
    CHECK (
      status IN (
        'PENDING',
        'ACCEPTED',
        'REJECTED',
        'CANCELLED'
      )
    ),

    created_at DATETIME
    DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME
    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id),

    FOREIGN KEY (group_id)
    REFERENCES groups(id)

  )
`);

module.exports = db;