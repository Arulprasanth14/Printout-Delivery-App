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

async function uploadDummyData() {
    const client = await pool.connect();
    try {
        // Start transaction
        await client.query('BEGIN');

        console.log('Running initial schema migration...');
        const schemaSql = fs.readFileSync(path.join(__dirname, '../migrations/001_initial_schema.sql'), 'utf8');
        await client.query(schemaSql);
        console.log('Initial schema migration completed successfully');

        console.log('Uploading dummy data...');
        const dataSql = fs.readFileSync(path.join(__dirname, '../migrations/002_dummy_data.sql'), 'utf8');
        await client.query(dataSql);
        console.log('Dummy data uploaded successfully');

        console.log('Applying invoice calculation fix...');
        const fixSql = fs.readFileSync(path.join(__dirname, '../migrations/003_fix_invoice_calculation.sql'), 'utf8');
        await client.query(fixSql);
        console.log('Invoice calculation fix applied successfully');

        // Commit transaction
        await client.query('COMMIT');
        console.log('All operations completed successfully!');
    } catch (err) {
        // Rollback transaction on error
        await client.query('ROLLBACK');
        console.error('Operation failed:', err);
        throw err;
    } finally {
        client.release();
    }
}

// Run the upload process
uploadDummyData()
    .then(() => {
        console.log('Dummy data upload process completed');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Dummy data upload process failed:', err);
        process.exit(1);
    }); 