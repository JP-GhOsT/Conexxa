const db = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

/* =========================
   CREATE TABLE
========================= */
db.run(`
  CREATE TABLE IF NOT EXISTS group_memberships (

    id TEXT PRIMARY KEY,

    user_id TEXT NOT NULL,
    group_id TEXT NOT NULL,

    status TEXT NOT NULL CHECK (
      status IN (
        'PENDING',
        'ACCEPTED',
        'REJECTED',
        'CANCELLED'
      )
    ),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id, group_id),

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (group_id) REFERENCES groups(id)
  )
`);

/* =========================
   CREATE JOIN REQUEST
========================= */
const createJoinRequest = (user_id, group_id) => {
  return new Promise((resolve, reject) => {
    const id = uuidv4();

    db.run(
      `INSERT INTO group_memberships (id, user_id, group_id, status)
       VALUES (?, ?, ?, ?)`,
      [id, user_id, group_id, "PENDING"],
      function (err) {
        if (err) return reject(err);

        resolve({
          id,
          user_id,
          group_id,
          status: "PENDING"
        });
      }
    );
  });
};

/* =========================
   GET USER STATUS IN GROUP
========================= */
const getUserGroupStatus = (user_id, group_id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT status 
       FROM group_memberships 
       WHERE user_id = ? AND group_id = ?`,
      [user_id, group_id],
      (err, row) => {
        if (err) return reject(err);

        resolve(row ? row.status : "NONE");
      }
    );
  });
};

/* =========================
   UPDATE STATUS (ADMIN ACTION)
========================= */
const updateMembershipStatus = (user_id, group_id, status) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE group_memberships
       SET status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ? AND group_id = ?`,
      [status, user_id, group_id],
      function (err) {
        if (err) return reject(err);

        resolve({
          user_id,
          group_id,
          status
        });
      }
    );
  });
};

/* =========================
   GET MEMBERS BY GROUP
========================= */
const getGroupMembers = (group_id) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * 
       FROM group_memberships 
       WHERE group_id = ? AND status = 'ACCEPTED'`,
      [group_id],
      (err, rows) => {
        if (err) return reject(err);

        resolve(rows);
      }
    );
  });
};

/* =========================
   EXPORTS
========================= */
module.exports = {
  createJoinRequest,
  getUserGroupStatus,
  updateMembershipStatus,
  getGroupMembers
};