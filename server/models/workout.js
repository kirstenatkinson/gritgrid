const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: String,
  sets: Number,
  reps: Number
});

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulty: String,
  focus: Number,
  intensity: String,
  exercises: [exerciseSchema],
  imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
