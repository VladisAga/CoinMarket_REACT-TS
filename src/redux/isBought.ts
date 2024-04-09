import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './configure-store';

const initialState = {
    isBuying: false
};

export const isBuyingSlice = createSlice({
    name: 'isBuying',
    initialState,
    reducers: {
        setStateOfBoughtTrue: (state) => {
            state.isBuying = true
        },
        setStateOfBoughtFalse: (state) => {
            state.isBuying = false
        }
    }
});

export const { setStateOfBoughtTrue, setStateOfBoughtFalse } = isBuyingSlice.actions;

export default isBuyingSlice.reducer;

export const stateOfBuying = (state: RootState) => state.isBuying.isBuying;