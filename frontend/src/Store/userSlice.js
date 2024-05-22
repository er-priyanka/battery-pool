import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";
import { baseURL } from './api';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo:null,
        token: localStorage.getItem('token') || null,
        loading: false,
        success:false,
        error: null,
    },
    reducers: {
        setUserInfo: (state, action) =>{
            state.userInfo = action.payload;
        },
        setLoading: (state, action) =>{
            state.loading = action.payload;
        },
        setError: (state, action) =>{
            state.error = action.payload;
        },
        setSuccess: (state, action) =>{
            state.success = action.payload;
        },
        setToken: (state, action) =>{
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        logoutUser: (state) =>{
            state.userInfo = null;
            state.token = null;
            state.success = false;
            localStorage.removeItem('token');
        }
    },
})

export const { setUserInfo, setLoading, setSuccess, setError, setToken, logoutUser } = userSlice.actions;

export const signUpUser = (userData) => async dispatch =>{
    try{
        dispatch(setLoading(true));
        const response = await axios.post(`${baseURL}/auth/signup`, userData);
        console.log(response.data);
        dispatch(setSuccess(true));
        dispatch(setUserInfo(response.data.newUser));
        dispatch(setLoading(false));
    }catch(error){
        console.log(error);
        dispatch(setSuccess(false));
        dispatch(setError(error.response.data.message));
        dispatch(setLoading(false));
    }
}


export const signInUser = (userData) => async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${baseURL}/auth/signin`, userData);
      console.log(response)
    //   dispatch(setUserInfo(res.data.user));
      dispatch(setToken(response.data.token));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response.data.message));
      dispatch(setLoading(false));
    }
  };
  
  const userReducer = userSlice.reducer;
  export default userReducer;