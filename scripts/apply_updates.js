const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

async function applyUpdates() {
    const client = await pool.connect();
    try {
        // Start transaction
        await client.query('BEGIN');

        console.log('Dropping existing functions and triggers...');
        const dropSql = `
            DROP TRIGGER IF EXISTS calculate_invoice_total_trigger ON invoices;
            DROP FUNCTION IF EXISTS calculate_invoice_total();
            DROP FUNCTION IF EXISTS calculate_printout_price(paper_size, color_type, paper_type, side_type, INTEGER);
            DROP FUNCTION IF EXISTS calculate_spiral_binding_price(paper_size, color_type, binding_type, side_type);
            DROP FUNCTION IF EXISTS calculate_lamination_price(paper_size, color_type, lamination_type, side_type, VARCHAR(50), INTEGER);
            DROP FUNCTION IF EXISTS calculate_photo_copy_price(paper_size, paper_type, side_type, INTEGER);
        `;
        await client.query(dropSql);
        console.log('Existing functions and triggers dropped successfully');

        console.log('Applying updated functions...');
        const schemaSql = fs.readFileSync(path.join(__dirname, '../migrations/001_initial_schema.sql'), 'utf8');
        await client.query(schemaSql);
        console.log('Updated functions applied successfully');

        // Commit transaction
        await client.query('COMMIT');
        console.log('All updates applied successfully!');
    } catch (err) {
        // Rollback transaction on error
        await client.query('ROLLBACK');
        console.error('Update failed:', err);
        throw err;
    } finally {
        client.release();
    }
}

// Run the updates
applyUpdates()
    .then(() => {
        console.log('Update process completed');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Update process failed:', err);
        process.exit(1);
    }); 