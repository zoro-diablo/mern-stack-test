import { useState } from 'react';

const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const res = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workout),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
    }
    if (res.ok) {
      setError(null);
      setTitle('');
      setLoad('');
      setReps('');
    }
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
      {error && <p className='error'>{error}</p>}
    </form>
  );
};
export default WorkoutForm;
