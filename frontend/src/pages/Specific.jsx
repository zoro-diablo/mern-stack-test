import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchWorkoutById,
  deleteWorkout,
} from '../redux/features/workoutSlice';

const Specific = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const workout = useSelector((state) =>
    state.workout.data.find((workout) => workout._id === id)
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchWorkoutById(id));
    }
  }, [dispatch, id]);

  const handleClick = (_id) => {
    dispatch(deleteWorkout(_id));
    navigate('/');
  };

  if (!workout) return <div>Loading workout details...</div>;

  return (
    <div className='specific-workout'>
      <div className='workout-details'>
        <h4>{workout.title}</h4>
        <div>
          <strong>Load (kg):</strong> {workout.load}
        </div>
        <div>
          <strong>Reps:</strong> {workout.reps}
        </div>
        <div>
          <strong>Created At:</strong> {workout.createdAt}
        </div>
        <span onClick={() => handleClick(workout._id)}>Delete</span>
      </div>
    </div>
  );
};

export default Specific;
