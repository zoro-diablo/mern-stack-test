import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: 'idle',
  error: null,
};

export const fetchWorkouts = createAsyncThunk(
  'workout/fetchWorkouts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('http://localhost:4000/api/workouts');
      return res.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Failed to fetch workouts.",
        statusCode: err.response?.status || 500,
      });
    }
  }
);

export const fetchWorkoutById = createAsyncThunk(
  'workout/fetchWorkoutById',
  async (_id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/workouts/${_id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Failed to fetch workout.",
        statusCode: err.response?.status || 500,
      });
    }
  }
);

export const postWorkout = createAsyncThunk(
  'workout/postWorkout',
  async (workout, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:4000/api/workouts', workout);
      return res.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Failed to post workout.",
        statusCode: err.response?.status || 500,
      });
    }
  }
);

export const deleteWorkout = createAsyncThunk(
  'workout/deleteWorkout',
  async (_id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:4000/api/workouts/${_id}`);
      return _id;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Failed to delete workout.",
        statusCode: err.response?.status || 500,
      });
    }
  }
);

export const updateWorkout = createAsyncThunk(
  'workout/updateWorkout',
  async ({ _id, title, load, reps }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/workouts/${_id}`, {
        title,
        load,
        reps,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Failed to update workout.",
        statusCode: err.response?.status || 500,
      });
    }
  }
);


export const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload.message;
      })
      .addCase(fetchWorkoutById.fulfilled, (state, action) => {
        state.data = [action.payload];
      })
      .addCase(fetchWorkoutById.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(postWorkout.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(postWorkout.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.data = state.data.filter((workout) => workout._id !== action.payload);
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        const index = state.data.findIndex((workout) => workout._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateWorkout.rejected, (state, action) => {
        state.error = action.payload.message;
      });
      
  },
});

export default workoutSlice.reducer;
