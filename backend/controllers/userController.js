const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Get all users (admin only)
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json(users);
});

// Get single user (admin or self)
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  
  // Allow access if admin or viewing own profile
  if (req.user.role !== 'admin' && req.user.userId !== req.params.id) {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  res.json(user);
});

// Update user (admin or self)
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Only admin can change roles
  if (req.body.role && req.user.role !== 'admin') {
    delete req.body.role;
  }

  Object.assign(user, req.body);
  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    address: user.address,
    phone: user.phone,
    isActive: user.isActive
  });
});

// Delete user (admin only)
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

