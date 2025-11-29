const db = require('../config/db');

// Create a new payment
const createPayment = async (invoiceId, userId, amount, paymentMode, paymentStatus, upiId) => {
  const result = await db.query(
    `INSERT INTO payments (invoice_id, user_id, amount, payment_mode, payment_status, upi_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [invoiceId, userId, amount, paymentMode, paymentStatus, upiId]
  );
  return result.rows[0];
};

// Get payment by ID
const getPaymentById = async (id) => {
  const result = await db.query('SELECT * FROM payments WHERE id = $1', [id]);
  return result.rows[0];
};

// Get payments by user ID
const getPaymentsByUserId = async (userId) => {
  const result = await db.query(
    'SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};

// Get payment by invoice ID
const getPaymentByInvoiceId = async (invoiceId) => {
  const result = await db.query(
    'SELECT * FROM payments WHERE invoice_id = $1',
    [invoiceId]
  );
  return result.rows[0];
};

// Update payment status
const updatePaymentStatus = async (paymentId, status) => {
  const result = await db.query(
    `UPDATE payments
     SET payment_status = $1
     WHERE id = $2
     RETURNING *`,
    [status, paymentId]
  );
  return result.rows[0];
};

module.exports = {
  createPayment,
  getPaymentById,
  getPaymentsByUserId,
  getPaymentByInvoiceId,
  updatePaymentStatus
}; 