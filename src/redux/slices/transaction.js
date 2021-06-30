import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { stringify } from 'query-string';
import { callAuthorizationApi } from '../../utils/request';

const initialState = {
  loading: false,
  error: null,
  transactions: [],
  from: moment().startOf('month').format('YYYY-MM-DD'),
  to: moment().endOf('month').format('YYYY-MM-DD'),
};

export const getTransactionsAsync = createAsyncThunk(
  'transaction/getTransactionsAsync',
  async (query, { rejectWithValue }) => {
    try {
      const queryString = stringify(query);
      const response = await callAuthorizationApi(`/transaction?${queryString}`, 'GET');
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionsAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.transactions = payload;
      })
      .addCase(getTransactionsAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

const transactionReducer = transactionSlice.reducer;

export default transactionReducer;
