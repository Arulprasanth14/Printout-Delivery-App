const db = require('../config/db');

// Create a new invoice
const createInvoice = async (orderId, userId, charges, gstTax, deliveryFee, totalAmount) => {
  const result = await db.query(
    `INSERT INTO invoices (order_id, user_id, charges, gst_tax, delivery_fee, total_amount)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [orderId, userId, charges, gstTax, deliveryFee, totalAmount]
  );
  return result.rows[0];
};

// Get invoice by ID
const getInvoiceById = async (id) => {
  const result = await db.query('SELECT * FROM invoices WHERE id = $1', [id]);
  return result.rows[0];
};

// Get invoices by user ID
const getInvoicesByUserId = async (userId) => {
  const result = await db.query(
    'SELECT * FROM invoices WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};

// Get invoice by order ID
const getInvoiceByOrderId = async (orderId) => {
  const result = await db.query(
    'SELECT * FROM invoices WHERE order_id = $1',
    [orderId]
  );
  return result.rows[0];
};

module.exports = {
  createInvoice,
  getInvoiceById,
  getInvoicesByUserId,
  getInvoiceByOrderId
}; 