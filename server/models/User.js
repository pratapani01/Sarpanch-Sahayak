const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Each email must be unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['citizen', 'sarpanch'], // Role can only be one of these two
    default: 'citizen',
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('User', UserSchema);