const express = require('express');
const router = express.Router();
const shopOwnerController = require('../controllers/shopOwnerController');
const auth = require('../middleware/authMiddleware');

router.post('/register', shopOwnerController.register);
router.post('/login', shopOwnerController.login);
router.get('/profile', auth, shopOwnerController.getProfile);
router.put('/profile', auth, shopOwnerController.updateShopOwner);
router.put('/change-password', auth, shopOwnerController.changePassword);
router.post('/forgot-password', shopOwnerController.sendOtp);
router.post('/verify-otp', shopOwnerController.verifyOtpAndChangePassword);

module.exports = router;
