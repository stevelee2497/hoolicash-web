import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { stringify } from 'query-string';
import { callAuthorizationApi } from '../../utils/request';

const initialState = {
  loading: false,
  error: null,
  transactions: [],
  from: moment('2021-06-01').format('YYYY-MM-DD'),
  to: moment('2021-06-30').endOf('month').format('YYYY-MM-DD'),
  walletId: null,
};

export const getTransactionsAsync = createAsyncThunk(
  'transaction/getTransactionsAsync',
  async (query, { rejectWithValue }) => {
    try {
      const queryString = stringify(query);
      const response = await callAuthorizationApi(`/transaction?${queryString}`, 'GET');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    selectWallet: (state, action) => {
      state.walletId = state.walletId ? null : action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionsAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.transactions = payload;
      })
      .addCase(getTransactionsAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { selectWallet } = transactionSlice.actions;

const transactionReducer = transactionSlice.reducer;

export default transactionReducer;
