import { configureStore } from '@reduxjs/toolkit';
import isBuyingReducer from './isBought'; 
import { coinApi } from './coinApi';
import isLoadingReducer from './isLoadingSlice';

export const store = configureStore({
    reducer: {
        [coinApi.reducerPath]: coinApi.reducer,
        isBuying: isBuyingReducer,
        isLoading: isLoadingReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coinApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;