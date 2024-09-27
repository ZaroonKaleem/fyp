const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true, // Duration in hours
  },
  productImage: {
    type: String,
    required: true, // Image URL or file path
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the date of creation
  },
});

module.exports = mongoose.model('Auction', auctionSchema);