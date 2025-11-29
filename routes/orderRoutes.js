const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// const authMiddleware = require('../middleware/authMiddleware');

// Protected routes
// router.post('/', authMiddleware, orderController.createOrder);
// router.get('/', authMiddleware, orderController.getOrders);
// router.get('/:orderId', authMiddleware, orderController.getOrderById);
// router.get('/statistics', authMiddleware, orderController.getOrderStatistics);

router.post('/orders', orderController.createOrder);
router.get('/',  orderController.getOrders);
router.get('/:orderId',  orderController.getOrderById);
router.get('/statistics',  orderController.getOrderStatistics);
router.get('/pending/all',  orderController.getPending);

module.exports = router;
