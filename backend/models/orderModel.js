const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  qty: Number
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shippingAddress: {
    name: String,
    email: String,
    address: String,
    phone: String
  },
  subtotal: Number,
  discount: { type: Number, default: 0 },
  total: Number,
  offerCode: String,
  status: { type: String, enum: ['pending','paid','shipped','delivered','cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
