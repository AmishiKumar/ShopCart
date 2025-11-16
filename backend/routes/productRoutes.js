const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

// Protected routes - Admin and Vendor can manage products
router.post('/', protect, authorize('admin', 'vendor'), productController.createProduct);
router.put('/:id', protect, authorize('admin', 'vendor'), productController.updateProduct);
router.delete('/:id', protect, authorize('admin', 'vendor'), productController.deleteProduct);

module.exports = router;
