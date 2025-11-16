const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', offerController.getOffers);
router.get('/code/:code', offerController.getOfferByCode);

// Protected routes - Admin only
router.post('/', protect, authorize('admin'), offerController.createOffer);
router.put('/:id', protect, authorize('admin'), offerController.updateOffer);
router.delete('/:id', protect, authorize('admin'), offerController.deleteOffer);

module.exports = router;
