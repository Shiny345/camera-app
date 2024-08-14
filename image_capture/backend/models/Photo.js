// backend/models/Photo.js

const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Photo', PhotoSchema);
