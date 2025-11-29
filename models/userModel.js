const db = require('../config/db');

// Get all users
const getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
};

// Create user
const createUser = async (name, email, mobile, password, address) => {
  const result = await db.query(
    `INSERT INTO users (name, email, mobile, password, address) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, mobile, password, address]
  );
  return result.rows[0];
};

// Get user by email
const getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

// Get user by ID
const getUserById = async (id) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const updateUser = async (id, name, email, mobile, address) => {
  const result = await db.query(
    `UPDATE users 
     SET name = $1, email = $2, mobile = $3, address = $4, updated_at = NOW()
     WHERE id = $5 
     RETURNING id, name, email, mobile, address, created_at, updated_at`,
    [name, email, mobile, address, id]
  );
  return result.rows[0];
};

// Update password
const updatePassword = async (id, password) => {
  const result = await db.query(
    `UPDATE users SET password = $1 WHERE id = $2 RETURNING *`,
    [password, id]
  );
  return result.rows[0];
};


module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  updatePassword
};
