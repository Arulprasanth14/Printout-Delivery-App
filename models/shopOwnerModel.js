const db = require('../config/db');

// Create Shop Owner
const createShopOwner = async (email, shop_name, mobile, address, password) => {
  const result = await db.query(
    `INSERT INTO shop_owners (email, shop_name, mobile, address, password)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [email, shop_name, mobile, address, password]
  );
  return result.rows[0];
};

// Get Shop Owner by Email
const getShopOwnerByEmail = async (email) => {
  const result = await db.query(
    `SELECT * FROM shop_owners WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

// Update shop owner details
const updateShopOwner = async (id, shop_name, mobile, address) => {
  const result = await db.query(
    `UPDATE shop_owners SET shop_name = $1, mobile = $2, address = $3 WHERE id = $4 RETURNING *`,
    [shop_name, mobile, address, id]
  );
  return result.rows[0];
};

// Change password
const updatePassword = async (id, hashedPassword) => {
  await db.query(
    `UPDATE shop_owners SET password = $1 WHERE id = $2`,
    [hashedPassword, id]
  );
};

const getShopOwnerById = async (id) => {
  const result = await db.query(`SELECT * FROM shop_owners WHERE id = $1`, [id]);
  return result.rows[0];
};


module.exports = {
  createShopOwner,
  getShopOwnerByEmail,
  updatePassword,
  updateShopOwner,
  getShopOwnerById,
};
