import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from './api';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTasks, setLoading, setError } = taskSlice.actions;

export const fetchTasks = () => async dispatch => {
  

  try {
    const token = localStorage.getItem('token');

    dispatch(setLoading(true));
    const response = await axios.get(`${baseURL}/tasks`, {
      headers: {
        'authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
    dispatch(setTasks(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response.data));
    dispatch(setLoading(false));
  }
};

export const createTask = (taskData) => async dispatch => {
 

  try {
    const token = localStorage.getItem('token');
    dispatch(setLoading(true));
    await axios.post(`${baseURL}/tasks`, taskData, {
      headers: {
        'authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch(fetchTasks());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response.data));
    dispatch(setLoading(false));
  }
};

export const updateTask = (taskData, id) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    
    dispatch(setLoading(true));
    await axios.patch(`${baseURL}/tasks/${id}`, taskData, {
      headers: {
        'authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch(fetchTasks());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response.data));
    dispatch(setLoading(false));
  }
};

export const deleteTask = (id) => async dispatch => {
  

  try {
    const token = localStorage.getItem('token');
    dispatch(setLoading(true));
    await axios.delete(`${baseURL}/tasks/${id}`, {
      headers: {
        'authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch(fetchTasks());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response.data));
    dispatch(setLoading(false));
  }
};

const taskReducer = taskSlice.reducer;

export default taskReducer;
