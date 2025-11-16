const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, cartController.getCart);
router.post('/add', protect, cartController.addToCart);
router.put('/item/:itemId', protect, cartController.updateCartItem);
router.delete('/item/:itemId', protect, cartController.removeFromCart);
router.delete('/clear', protect, cartController.clearCart);
router.get('/total', protect, cartController.getCartTotal);

module.exports = router;

