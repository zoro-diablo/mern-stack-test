const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    console.error(`Error getting workouts: ${error.message}`);
    res.status(500).json({ message: 'Error getting workouts' });
  }
};

const getWorkoutById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: 'Invalid workout ID' });
  }
  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.error(`Error finding workout: ${error.message}`);
    res.status(500).json({ message: 'Error finding workout' });
  }
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(201).json(workout);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).json({ message: error.message });
    }
    console.error(`Error creating workout: ${error.message}`);
    res.status(500).json({ message: 'Error creating workout' });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: 'Invalid workout ID' });
  }
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.findByIdAndUpdate(id, { title, reps, load }, { new: true });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.error(`Error updating workout: ${error.message}`);
    res.status(500).json({ message: 'Error updating workout' });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: 'Invalid workout ID' });
  }
  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error(`Error deleting workout: ${error.message}`);
    res.status(500).json({ message: 'Error deleting workout' });
  }
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
