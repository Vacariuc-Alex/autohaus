import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "src/utils/constants/constants";

type DataState = {
    responseData: Product[];
    loading: boolean;
    error: string | null;
    isRequestExecuted: boolean;
}

const initialState: DataState = {
    responseData: [],
    loading: false,
    error: null,
    isRequestExecuted: false
};

const productsSlice = createSlice({
    name: "productsSlice",
    initialState,
    reducers: {
        fetchDataRequest(state: DataState) {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess(state: DataState, action: PayloadAction<Product[]>) {
            state.responseData = action.payload;
            state.isRequestExecuted = true;
            state.loading = false;
        },
        fetchDataError(state: DataState, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {
    fetchDataRequest,
    fetchDataSuccess,
    fetchDataError
} = productsSlice.actions;
export default productsSlice.reducer;
