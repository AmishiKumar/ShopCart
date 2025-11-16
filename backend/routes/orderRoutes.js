const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/authMiddleware');

router.post('/', protect, ctrl.createOrder);
router.get('/', protect, ctrl.getOrders);
router.get('/:id', protect, ctrl.getOrder);
router.put('/:id/status', protect, authorize('admin', 'vendor'), ctrl.updateOrderStatus);

module.exports = router;
