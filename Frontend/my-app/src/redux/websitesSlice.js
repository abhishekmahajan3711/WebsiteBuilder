import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWebsites = createAsyncThunk('websites/fetchWebsites', async (token, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5000/api/websites', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Failed to load websites');
  }
});

const websitesSlice = createSlice({
  name: 'websites',
  initialState: {
    websites: [],
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {
    resetWebsites: (state) => {
      state.websites = [];
      state.loading = false;
      state.error = null;
      state.fetched = false;
    },
    updateWebsite: (state, action) => {
      const updated = action.payload;
      const idx = state.websites.findIndex(w => w._id === updated._id);
      if (idx !== -1) {
        state.websites[idx] = updated;
      }
    },
    addWebsite: (state, action) => {
      // Add the new website to the beginning of the array
      state.websites.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebsites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebsites.fulfilled, (state, action) => {
        state.loading = false;
        state.websites = action.payload;
        state.fetched = true;
      })
      .addCase(fetchWebsites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.fetched = false;
      });
  },
});

export const { resetWebsites, updateWebsite, addWebsite } = websitesSlice.actions;
export default websitesSlice.reducer;