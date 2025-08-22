const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Roads', 'Sanitation', 'Water', 'Electricity', 'Other'],
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  // Add this new field for location
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Complaint', ComplaintSchema);