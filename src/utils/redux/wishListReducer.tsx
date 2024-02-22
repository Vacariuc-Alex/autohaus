import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type DataState = {
    ids: number[];
}

const initialState: DataState = {
    ids: [],
}

export const wishListSlice = createSlice({
    name: 'wishListSlice',
    initialState,
    reducers: {
        addItem: (state: DataState, action: PayloadAction<number>) => {
            if (!state.ids.includes(action.payload)) {
                state.ids.push(action.payload);
            }
        },
        removeItem: (state: DataState, action: PayloadAction<number>) => {
            const index = state.ids.findIndex((e) => e === action.payload);
            if (index !== -1) {
                state.ids.splice(index, 1);
            }
        }
    }
});

export const {
    addItem,
    removeItem
} = wishListSlice.actions;
export default wishListSlice.reducer;
