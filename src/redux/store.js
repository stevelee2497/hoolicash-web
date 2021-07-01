import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import transactionReducer from './slices/transaction';
import walletReducer from './slices/wallet';

const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    wallet: walletReducer,
  },
});

export default store;
