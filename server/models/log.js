const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  weight: Number,
  notes: String
});

module.exports = mongoose.model('Log', logSchema);