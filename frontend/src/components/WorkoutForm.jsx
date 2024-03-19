import { useState } from 'react';
import { postWorkout } from '../redux/features/workoutSlice';
import { useDispatch, useSelector } from 'react-redux';

const WorkoutForm = () => {
  const dispatch = useDispatch();
  const workoutError = useSelector((state) => state.workout.error);

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postWorkout({ title, load: Number(load), reps: Number(reps) }))
      .unwrap()
      .then(() => {
        setTitle('');
        setLoad('');
        setReps('');
      })
      .catch((err) => console.error('Failed to post workout: ', err));
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      <label>Exercise Title:</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Load (kg):</label>
      <input
        type='number'
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />
      <label>Reps:</label>
      <input
        type='number'
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <button>Add Workout</button>
      {workoutError && <div className='error'>{workoutError}</div>}
    </form>
  );
};
export default WorkoutForm;
