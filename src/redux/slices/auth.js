import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callApi } from '../../utils/request';

const initialState = {
  loading: false,
  error: null,
  token: null,
  userId: null,
  profile: null,
};

export const loginAsync = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const response = await callApi('/account/login', 'POST', data);
    return response.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response.data);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.accessToken;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
