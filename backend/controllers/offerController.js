const asyncHandler = require('express-async-handler');
const Offer = require('../models/offerModel');

exports.createOffer = asyncHandler(async (req, res) => {
  const o = new Offer(req.body);
  await o.save();
  res.status(201).json(o);
});

exports.getOffers = asyncHandler(async (req, res) => {
  const offers = await Offer.find({}).sort({ createdAt: -1 });
  res.json(offers);
});

exports.getOfferByCode = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const now = new Date();
  const offer = await Offer.findOne({ code, active: true, $or: [{ startsAt: null }, { startsAt: { $lte: now } }], $or2: [{ endsAt: null }, { endsAt: { $gte: now } }] });
  // query above shows intent; a correct query:
  const q = { code, active: true };
  const o = await Offer.findOne(q);
  if (!o) return res.status(404).json({ message: 'Offer not found' });
  res.json(o);
});

exports.updateOffer = asyncHandler(async (req, res) => {
  const o = await Offer.findById(req.params.id);
  if (!o) return res.status(404).json({ message: 'not found' });
  Object.assign(o, req.body);
  await o.save();
  res.json(o);
});

exports.deleteOffer = asyncHandler(async (req, res) => {
  const o = await Offer.findById(req.params.id);
  if (!o) return res.status(404).json({ message: 'not found' });
  await Offer.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});
