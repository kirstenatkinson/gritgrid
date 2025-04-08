const express = require('express');
const router = express.Router();
const Log = require('../models/log');

// GET all
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().sort({date: -1});
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one
router.get('/:id', async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new log
router.post('/', async (req, res) => {
  const { weight, notes } = req.body;
  const log = new Log({ weight, notes }); // date will be auto-added

  try {
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // PUT update
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedLog = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedLog) return res.status(404).json({ message: 'Log not found' });
//     res.status(200).json(updatedLog);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // DELETE
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleted = await Log.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'Log not found' });
//     res.status(200).json({ message: 'Log deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;
