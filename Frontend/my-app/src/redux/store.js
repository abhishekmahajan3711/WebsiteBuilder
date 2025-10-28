import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import websitesReducer from './websitesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    websites: websitesReducer,
  },
});

export default store; 