const mongoose = require('mongoose');

// Creating Schema

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = mongoose.model('Book', bookSchema);