const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Offer = require('../models/offerModel');
const Product = require('../models/productModel');

// Create order (cart -> checkout)
exports.createOrder = asyncHandler(async (req, res) => {
  /*
    Expected body:
    {
      items: [{ product, name, price, qty }],
      shippingAddress: { name, email, address, phone },
      offerCode?: "SAVE20"
    }
  */
  const { items, shippingAddress, offerCode } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ message: 'No items' });
  
  // Require authenticated user
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  const userId = req.user.userId;

  // compute subtotal
  let subtotal = items.reduce((s, it) => s + (it.price * it.qty), 0);
  let discount = 0;

  if (offerCode) {
    const offer = await Offer.findOne({ code: offerCode, active: true });
    if (offer) {
      // optional: check minCartValue, dates
      if (offer.discountType === 'percent') discount = (subtotal * (offer.value/100));
      else discount = offer.value;
      if (discount > subtotal) discount = subtotal;
    }
  }

  const total = subtotal - discount;

  // reduce stock (simple approach)
  for (const it of items) {
    if (it.product) {
      const prod = await Product.findById(it.product);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - it.qty);
        await prod.save();
      }
    }
  }

  const order = new Order({
    items, 
    user: userId,
    shippingAddress,
    subtotal, 
    discount, 
    total, 
    offerCode
  });
  await order.save();
  
  // Populate user details
  await order.populate('user', 'name email');
  res.status(201).json(order);
});

// List orders (admin or user)
exports.getOrders = asyncHandler(async (req, res) => {
  let query = {};
  
  // If not admin, only show user's own orders
  if (req.user && req.user.role !== 'admin') {
    query.user = req.user.userId;
  }
  
  const orders = await Order.find(query)
    .populate('user', 'name email')
    .populate('items.product', 'name images')
    .sort({ createdAt: -1 });
  res.json(orders);
});

// Get single order
exports.getOrder = asyncHandler(async (req, res) => {
  const o = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .populate('items.product', 'name images price');
  
  if (!o) return res.status(404).json({ message: 'Not found' });
  
  // Check if user has access (admin or order owner)
  if (req.user && req.user.role !== 'admin' && o.user._id.toString() !== req.user.userId) {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  res.json(o);
});

// Update status
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const o = await Order.findById(req.params.id);
  if (!o) return res.status(404).json({ message: 'not found' });
  o.status = status;
  await o.save();
  res.json(o);
});
