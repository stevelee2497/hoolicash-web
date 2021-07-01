import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { stringify } from 'query-string';
import { callAuthorizationApi } from '../../utils/request';

const initialState = {
  loading: false,
  error: null,
  wallets: [],
  from: moment().startOf('month').format('YYYY-MM-DD'),
  to: moment().endOf('month').format('YYYY-MM-DD'),
};

export const getWalletsAsync = createAsyncThunk(
  'wallet/getWalletsAsync',
  async (query, { rejectWithValue }) => {
    try {
      const queryString = stringify(query);
      const response = await callAuthorizationApi(`/wallet?${queryString}`, 'GET');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWalletsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWalletsAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wallets = payload;
      })
      .addCase(getWalletsAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

const walletReducer = walletSlice.reducer;

export default walletReducer;
