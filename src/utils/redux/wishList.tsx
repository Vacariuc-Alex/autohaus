import {createSlice} from '@reduxjs/toolkit'

export type WishList = {
    ids: number[]
}

const initialState: WishList = {
    ids: [],
}

export const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        addItem: (state, action) => {
            if (!state.ids.includes(action.payload)) {
                state.ids.push(action.payload);
            }
        },
        removeItem: (state, action) => {
            const index = state.ids.findIndex((e) => e === action.payload);
            if(index !== -1) {
                state.ids.splice(index, 1);
            }
        }
    }
});

export const {addItem, removeItem} = wishListSlice.actions;
export default wishListSlice.reducer;
