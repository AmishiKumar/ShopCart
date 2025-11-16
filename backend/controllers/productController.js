const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// Create product
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, slug, description, price, stock, category, images } = req.body;
  const exists = await Product.findOne({ slug });
  if (exists) return res.status(400).json({ message: 'Slug already exists' });

  const p = new Product({ name, slug, description, price, stock, category, images });
  await p.save();
  res.status(201).json(p);
});

// Read all (with optional query)
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.json(products);
});

// Read single
exports.getProduct = asyncHandler(async (req, res) => {
  let p = await Product.findById(req.params.id);
  if (!p) p = await Product.findOne({ slug: req.params.id });
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
});

// Update
exports.updateProduct = asyncHandler(async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  Object.assign(p, req.body);
  await p.save();
  res.json(p);
});

// Delete
exports.deleteProduct = asyncHandler(async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});
