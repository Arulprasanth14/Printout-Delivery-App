const db = require('../config/db'); // assuming you use a db.js to export pool/client

const orderModel = {
  createOrder: async (userId, orderType, status, totalAmount, numberOfItems, urlFile, printoutPricingId) => {
    const query = `
      INSERT INTO orders 
        (user_id, order_type, status, total_amount, number_of_items, url_file, printout_pricing_id, created_at, updated_at)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING *;
    `;
    const values = [userId, orderType, status, totalAmount, numberOfItems, urlFile, printoutPricingId];

    const { rows } = await db.query(query, values);
    return rows[0];
  },

  getOrderById: async (orderId) => {
    const query = `SELECT * FROM orders WHERE id = $1`;
    const { rows } = await db.query(query, [orderId]);
    return rows[0];
  },

  getPendingOrders: async () => {
    const query = `
      SELECT * FROM orders
      WHERE status = 'pending'
      ORDER BY created_at DESC;
    `;
    const { rows } = await db.query(query);
    return rows;
  }

  // Add other methods like updateOrder, deleteOrder, listOrders etc if needed
};

module.exports = orderModel;
