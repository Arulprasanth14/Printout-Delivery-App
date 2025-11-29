const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes
router.post('/order/:orderId', authMiddleware, invoiceController.createInvoice);
router.get('/', authMiddleware, invoiceController.getInvoices);
router.get('/:invoiceId', authMiddleware, invoiceController.getInvoiceById);
router.get('/order/:orderId', authMiddleware, invoiceController.getInvoiceByOrderId);

module.exports = router; 