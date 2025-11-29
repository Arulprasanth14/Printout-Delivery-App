const db = require('../config/db');

// Create a new printout order
const createPrintout = async (orderId, size, colorType, paperType, sideType, copies, filePath) => {
  const result = await db.query(
    `INSERT INTO printout_pricing (order_id, size, color_type, paper_type, side_type, copies, file_path)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [orderId, size, colorType, paperType, sideType, copies, filePath]
  );
  return result.rows[0];
};

// Create a new spiral binding order
const createSpiralBinding = async (orderId, size, colorType, bindingType, sideType, frontPageColor, filePath) => {
  const result = await db.query(
    `INSERT INTO spiral_bindings (order_id, size, color_type, binding_type, side_type, front_page_color, file_path)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [orderId, size, colorType, bindingType, sideType, frontPageColor, filePath]
  );
  return result.rows[0];
};

// Create a new lamination order
const createLamination = async (orderId, size, colorType, laminationType, sideType, thickness, specialFeatures, copies, filePath) => {
  const result = await db.query(
    `INSERT INTO laminations (order_id, size, color_type, lamination_type, side_type, thickness, special_features, copies, file_path)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [orderId, size, colorType, laminationType, sideType, thickness, specialFeatures, copies, filePath]
  );
  return result.rows[0];
};

// Create a new photo copies order
const createPhotoCopies = async (orderId, size, paperType, sideType, copies, filePath) => {
  const result = await db.query(
    `INSERT INTO photo_copies (order_id, size, paper_type, side_type, copies, file_path)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [orderId, size, paperType, sideType, copies, filePath]
  );
  return result.rows[0];
};

// Get printout details by order ID
const getPrintoutByAttributes = async (size, colorType, paperType, sideType) => {
  const query = `
    SELECT id, price_per_page
    FROM printout_pricing
    WHERE size = $1
      AND color_type = $2
      AND paper_type = $3
      AND side_type = $4
    LIMIT 1;
  `;

  const values = [size, colorType, paperType, sideType];
  const result = await db.query(query, values);

  return result.rows[0];  // returns { id: ..., price_per_page: ... }
};

const getPrintoutByOrderId = async (orderId) => {
  const result = await db.query('SELECT * FROM printout WHERE order_id = $1', [orderId]);
  return result.rows[0];
};
// Get spiral binding details by order ID
const getSpiralBindingByOrderId = async (orderId) => {
  const result = await db.query('SELECT * FROM spiral_bindings WHERE order_id = $1', [orderId]);
  return result.rows[0];
};

// Get lamination details by order ID
const getLaminationByOrderId = async (orderId) => {
  const result = await db.query('SELECT * FROM laminations WHERE order_id = $1', [orderId]);
  return result.rows[0];
};

// Get photo copies details by order ID
const getPhotoCopiesByOrderId = async (orderId) => {
  const result = await db.query('SELECT * FROM photo_copies WHERE order_id = $1', [orderId]);
  return result.rows[0];
};

module.exports = {
  createPrintout,
  createSpiralBinding,
  createLamination,
  createPhotoCopies,
  getPrintoutByOrderId,
  getSpiralBindingByOrderId,
  getLaminationByOrderId,
  getPhotoCopiesByOrderId,
  getPrintoutByAttributes
}; 