const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// GET all
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new
router.post('/', async (req, res) => {
  const workout = new Workout(req.body);
  try {
    const newWorkout = await workout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWorkout) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json(updatedWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Workout.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
