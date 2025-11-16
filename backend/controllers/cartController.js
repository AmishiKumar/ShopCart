const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Get user's cart
exports.getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.userId })
    .populate('items.product', 'name price images stock slug');
  
  if (!cart) {
    cart = await Cart.create({ user: req.user.userId, items: [] });
  }
  
  res.json(cart);
});

// Add item to cart
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  // Check stock availability
  if (product.stock < quantity) {
    return res.status(400).json({ message: 'Insufficient stock' });
  }
  
  // Find or create cart
  let cart = await Cart.findOne({ user: req.user.userId });
  if (!cart) {
    cart = await Cart.create({ user: req.user.userId, items: [] });
  }
  
  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );
  
  if (existingItemIndex > -1) {
    // Update quantity
    const newQuantity = cart.items[existingItemIndex].quantity + quantity;
    if (newQuantity > product.stock) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    cart.items[existingItemIndex].quantity = newQuantity;
    cart.items[existingItemIndex].price = product.price;
  } else {
    // Add new item
    cart.items.push({
      product: productId,
      quantity,
      price: product.price
    });
  }
  
  await cart.save();
  await cart.populate('items.product', 'name price images stock slug');
  
  res.json(cart);
});

// Update cart item quantity
exports.updateCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  
  if (quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }
  
  const cart = await Cart.findOne({ user: req.user.userId })
    .populate('items.product', 'name price images stock slug');
  
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  
  const item = cart.items.id(itemId);
  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }
  
  // Check stock availability
  const product = await Product.findById(item.product);
  if (product.stock < quantity) {
    return res.status(400).json({ message: 'Insufficient stock' });
  }
  
  item.quantity = quantity;
  item.price = product.price;
  
  await cart.save();
  
  res.json(cart);
});

// Remove item from cart
exports.removeFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  
  const cart = await Cart.findOne({ user: req.user.userId });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  
  cart.items = cart.items.filter(item => item._id.toString() !== itemId);
  await cart.save();
  
  await cart.populate('items.product', 'name price images stock slug');
  res.json(cart);
});

// Clear cart
exports.clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.userId });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  
  cart.items = [];
  await cart.save();
  
  res.json({ message: 'Cart cleared', cart });
});

// Get cart total
exports.getCartTotal = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.userId })
    .populate('items.product', 'price stock');
  
  if (!cart || cart.items.length === 0) {
    return res.json({ subtotal: 0, itemCount: 0 });
  }
  
  const subtotal = cart.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  const itemCount = cart.items.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
  
  res.json({ subtotal, itemCount });
});

