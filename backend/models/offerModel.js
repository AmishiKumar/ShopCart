const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // e.g., SAVE20
  description: String,
  discountType: { type: String, enum: ['percent','fixed'], default: 'percent' },
  value: { type: Number, required: true }, // 20 (for 20%) or 100 (for ₹100)
  minCartValue: { type: Number, default: 0 },
  startsAt: Date,
  endsAt: Date,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Offer', offerSchema);
