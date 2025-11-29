const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes
router.post('/invoice/:invoiceId', authMiddleware, paymentController.createPayment);
router.get('/', authMiddleware, paymentController.getPayments);
router.get('/:paymentId', authMiddleware, paymentController.getPaymentById);
router.get('/invoice/:invoiceId', authMiddleware, paymentController.getPaymentByInvoiceId);
router.put('/:paymentId/status', authMiddleware, paymentController.updatePaymentStatus);

module.exports = router; 