import { useEffect, useState } from 'react';
import {
  fetchWorkoutById,
  updateWorkout,
} from '../redux/features/workoutSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const EditForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const workout = useSelector((state) =>
    state.workout.data.find((w) => w._id === id)
  );

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (workout) {
      setTitle(workout.title);
      setLoad(workout.load);
      setReps(workout.reps);
    } else {
      dispatch(fetchWorkoutById(id))
        .unwrap()
        .catch((err) => {
          setError('Failed to fetch workout details.', err.message);
        });
    }
  }, [dispatch, workout, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    dispatch(
      updateWorkout({ _id: id, title, load: Number(load), reps: Number(reps) })
    )
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError(err.message || 'Failed to update the workout.');
      });
  };

  return (
    <div>
      <form className='create' onSubmit={handleSubmit}>
        <h3>Edit Workout</h3>
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
        <button>Update Workout</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};

export default EditForm;
