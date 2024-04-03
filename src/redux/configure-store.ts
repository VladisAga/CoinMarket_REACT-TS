import { configureStore } from '@reduxjs/toolkit';
import { coinApi } from './coinApi';

export const store = configureStore({
    reducer: {
        [coinApi.reducerPath]: coinApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coinApi.middleware),
});