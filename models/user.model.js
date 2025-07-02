const db = require('../config/db');

const createUser = (user, callback) => {
    
  const sql = "INSERT INTO users (name, email, password, role, mobile_no) VALUES (?, ?, ?, ?,?)";
  db.query(sql, [user.name, user.email, user.password, user.role, user.mobile_no], callback);
};

const getUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};

const checkIfRoleExists = (role, callback) => {
  const sql = "SELECT * FROM users WHERE role = ?";
  db.query(sql, [role], callback);
};

module.exports = {
  createUser,
  getUserByEmail,
  checkIfRoleExists
};
