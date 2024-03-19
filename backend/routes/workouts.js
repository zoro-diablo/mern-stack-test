const express = require('express');
const Workout = require('../models/WorkoutModel');
const {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutControllers');

const router = express.Router();

router.get('/', getAllWorkouts);

router.get('/:id', getWorkoutById);

router.post('/', createWorkout);

router.put('/:id', updateWorkout);

router.delete('/:id', deleteWorkout);

module.exports = router;
