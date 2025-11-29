const db = require('../config/db');
const { Pool } = require('pg');
const pool = new Pool();

// Function to get pricing ID for printouts
const getPrintoutPricingId = async (size, colorType, paperType, sideType) => {
  const result = await db.query(
    `SELECT id, price_per_page FROM printout_pricing 
     WHERE size = $1 AND color_type = $2 AND paper_type = $3 AND side_type = $4`,
    [size, colorType, paperType, sideType]
  );
  return result.rows[0];
};

// Function to get pricing ID for spiral bindings
const getSpiralBindingPricingId = async (size, colorType, bindingType, sideType) => {
  const result = await db.query(
    `SELECT id, price_per_unit FROM spiral_binding_pricing 
     WHERE size = $1 AND color_type = $2 AND binding_type = $3 AND side_type = $4`,
    [size, colorType, bindingType, sideType]
  );
  return result.rows[0];
};

// Function to get pricing ID for laminations
const getLaminationPricingId = async (size, colorType, laminationType, sideType, thickness) => {
  const result = await db.query(
    `SELECT id, price_per_unit FROM lamination_pricing 
     WHERE size = $1 AND color_type = $2 AND lamination_type = $3 AND side_type = $4 AND thickness = $5`,
    [size, colorType, laminationType, sideType, thickness]
  );
  return result.rows[0];
};

// Function to get pricing ID for photo copies
const getPhotoCopyPricingId = async (size, paperType, sideType) => {
  const result = await db.query(
    `SELECT id, price_per_page FROM photo_copy_pricing 
     WHERE size = $1 AND paper_type = $2 AND side_type = $3`,
    [size, paperType, sideType]
  );
  return result.rows[0];
};

// Store printout document and calculate price
const storePrintoutDocument = async (orderId, size, colorType, paperType, sideType, copies, s3Url) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Get pricing ID and price
    const pricingInfo = await getPrintoutPricingId(size, colorType, paperType, sideType);
    if (!pricingInfo) {
      throw new Error('No pricing configuration found for the given parameters');
    }

    // Calculate total price
    const totalPrice = pricingInfo.price_per_page * copies;

    // Store document and pricing information
    const result = await client.query(
      `INSERT INTO printouts (order_id, size, color_type, paper_type, side_type, copies, file_path, pricing_id, total_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [orderId, size, colorType, paperType, sideType, copies, s3Url, pricingInfo.id, totalPrice]
    );

    await client.query('COMMIT');
    return { ...result.rows[0], calculated_price: totalPrice };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// Store spiral binding document and calculate price
const storeSpiralBindingDocument = async (orderId, size, colorType, bindingType, sideType, frontPageColor, s3Url) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Get pricing ID and price
    const pricingInfo = await getSpiralBindingPricingId(size, colorType, bindingType, sideType);
    if (!pricingInfo) {
      throw new Error('No pricing configuration found for the given parameters');
    }

    // Store document and pricing information
    const result = await client.query(
      `INSERT INTO spiral_bindings (order_id, size, color_type, binding_type, side_type, front_page_color, file_path, pricing_id, total_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [orderId, size, colorType, bindingType, sideType, frontPageColor, s3Url, pricingInfo.id, pricingInfo.price_per_unit]
    );

    await client.query('COMMIT');
    return { ...result.rows[0], calculated_price: pricingInfo.price_per_unit };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// Store lamination document and calculate price
const storeLaminationDocument = async (orderId, size, colorType, laminationType, sideType, thickness, specialFeatures, copies, s3Url) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Get pricing ID and price
    const pricingInfo = await getLaminationPricingId(size, colorType, laminationType, sideType, thickness);
    if (!pricingInfo) {
      throw new Error('No pricing configuration found for the given parameters');
    }

    // Calculate total price
    const totalPrice = pricingInfo.price_per_unit * copies;

    // Store document and pricing information
    const result = await client.query(
      `INSERT INTO laminations (order_id, size, color_type, lamination_type, side_type, thickness, special_features, copies, file_path, pricing_id, total_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [orderId, size, colorType, laminationType, sideType, thickness, specialFeatures, copies, s3Url, pricingInfo.id, totalPrice]
    );

    await client.query('COMMIT');
    return { ...result.rows[0], calculated_price: totalPrice };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// Store photo copy document and calculate price
const storePhotoCopyDocument = async (orderId, size, paperType, sideType, copies, s3Url) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Get pricing ID and price
    const pricingInfo = await getPhotoCopyPricingId(size, paperType, sideType);
    if (!pricingInfo) {
      throw new Error('No pricing configuration found for the given parameters');
    }

    // Calculate total price
    const totalPrice = pricingInfo.price_per_page * copies;

    // Store document and pricing information
    const result = await client.query(
      `INSERT INTO photo_copies (order_id, size, paper_type, side_type, copies, file_path, pricing_id, total_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [orderId, size, paperType, sideType, copies, s3Url, pricingInfo.id, totalPrice]
    );

    await client.query('COMMIT');
    return { ...result.rows[0], calculated_price: totalPrice };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  storePrintoutDocument,
  storeSpiralBindingDocument,
  storeLaminationDocument,
  storePhotoCopyDocument
}; 