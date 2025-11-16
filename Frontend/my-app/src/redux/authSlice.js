import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { resetWebsites } from './websitesSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  featureAccess: null,
  loading: false,
  error: null,
  authChecked: false,
};

export const signupUser = createAsyncThunk('auth/signupUser', async (form, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, form);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Signup failed');
  }
});

export const signinUser = createAsyncThunk('auth/signinUser', async (form, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, form);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Signin failed');
  }
});

export const loadUser = createAsyncThunk('auth/loadUser', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  if (!token) return thunkAPI.rejectWithValue('No token');
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { ...response.data, token };
  } catch (err) {
    localStorage.removeItem('token');
    return thunkAPI.rejectWithValue('Session expired, please sign in again');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      state.featureAccess = null;
      localStorage.removeItem('token');
    },
    updateFeatureAccess: (state, action) => {
      state.featureAccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.featureAccess = action.payload.featureAccess || null;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.featureAccess = action.payload.featureAccess || null;
        state.authChecked = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.featureAccess = null;
        state.error = action.payload;
        state.authChecked = true;
      });
  },
});

export const { logout, updateFeatureAccess } = authSlice.actions;
export default authSlice.reducer; 