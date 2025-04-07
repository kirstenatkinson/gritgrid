const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  item: String,
  amount: String,
  unit: String,
  preparation: String
});

const instructionSchema = new mongoose.Schema({
  step: Number,
  description: String
});

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [ingredientSchema],
  instructions: [instructionSchema],
  notes: String,
  servings: Number,
  photoUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
