import { useEffect } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkout, fetchWorkouts } from '../redux/features/workoutSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const {
    data: workouts,
    loading,
    error,
  } = useSelector((state) => state.workout);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  const handleClick = (_id) => {
    dispatch(deleteWorkout(_id));
  };

  return (
    <div className='home'>
      {loading === 'loading' && <div>Loading workouts...</div>}
      {error && <div>Error fetching workouts: {error}</div>}
      <div className='workouts'>
        {workouts &&
          workouts.map((workout) => (
            <div className='workout-details' key={workout._id}>
              <Link to={`/${workout._id}`}>
                <h4>{workout.title}</h4>
                <p>
                  <strong>Load (kg):</strong>
                  {workout.load}
                </p>
                <p>
                  <strong>Reps (kg):</strong>
                  {workout.reps}
                </p>
                <p>{workout.createdAt}</p>
                <span onClick={() => handleClick(workout._id)}>delete</span>
              </Link>
              <Link to={`/edit/${workout._id}`}>
                <button>Update</button>
              </Link>
            </div>
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};
export default Home;
