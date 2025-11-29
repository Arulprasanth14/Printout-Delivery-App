const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');

// Store printout document
router.post('/printouts', authMiddleware, async (req, res) => {
  try {
    const { orderId, size, colorType, paperType, sideType, copies, s3Url } = req.body;
    const result = await documentController.storePrintoutDocument(
      orderId, size, colorType, paperType, sideType, copies, s3Url
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Store spiral binding document
router.post('/spiral-bindings', authMiddleware, async (req, res) => {
  try {
    const { orderId, size, colorType, bindingType, sideType, frontPageColor, s3Url } = req.body;
    const result = await documentController.storeSpiralBindingDocument(
      orderId, size, colorType, bindingType, sideType, frontPageColor, s3Url
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Store lamination document
router.post('/laminations', authMiddleware, async (req, res) => {
  try {
    const { orderId, size, colorType, laminationType, sideType, thickness, specialFeatures, copies, s3Url } = req.body;
    const result = await documentController.storeLaminationDocument(
      orderId, size, colorType, laminationType, sideType, thickness, specialFeatures, copies, s3Url
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Store photo copy document
router.post('/photo-copies', authMiddleware, async (req, res) => {
  try {
    const { orderId, size, paperType, sideType, copies, s3Url } = req.body;
    const result = await documentController.storePhotoCopyDocument(
      orderId, size, paperType, sideType, copies, s3Url
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 