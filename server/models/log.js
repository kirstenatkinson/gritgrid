const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  weight: Number,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
