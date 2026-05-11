const db = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

/* =========================
   CREATE TABLE
========================= */
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS groupMembers (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      group_id TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('MEMBER', 'ADMIN')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      UNIQUE(user_id, group_id),

      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (group_id) REFERENCES groups(id)
    )
  `);
});

/* =========================
   ADD MEMBER
========================= */
const addMember = (user_id, group_id, role = "MEMBER") => {
  return new Promise((resolve, reject) => {
    const id = uuidv4();

    db.run(
      `INSERT INTO groupMembers (id, user_id, group_id, role)
       VALUES (?, ?, ?, ?)`,
      [id, user_id, group_id, role],
      function (err) {
        if (err) return reject(err);

        resolve({
          id,
          user_id,
          group_id,
          role
        });
      }
    );
  });
};

/* =========================
   GET MEMBERS BY GROUP
========================= */
const getMembersByGroup = (group_id) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM groupMembers WHERE group_id = ?`,
      [group_id],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
};

/* =========================
   CHECK MEMBER EXISTS
========================= */
const isMember = (user_id, group_id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM groupMembers 
       WHERE user_id = ? AND group_id = ?`,
      [user_id, group_id],
      (err, row) => {
        if (err) return reject(err);
        resolve(!!row);
      }
    );
  });
};

module.exports = {
  addMember,
  getMembersByGroup,
  isMember
};