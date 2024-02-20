import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type DataState = {
    selectedCompanies: string[];
    currentPage: number;
    numberOfPages: number;
    elementsPerPage: number;
}

const initialState: DataState = {
    selectedCompanies: [],
    currentPage: 1,
    numberOfPages: 1,
    elementsPerPage: 10
}

export const userSelectionSlice = createSlice({
    name: 'userSelectionSlice',
    initialState,
    reducers: {
        // selectedCompanies
        addNewCompany: (state: DataState, action: PayloadAction<string>) => {
            const selectedCompanies = state.selectedCompanies;
            if (!selectedCompanies.includes(action.payload)) {
                state.selectedCompanies = [...selectedCompanies, action.payload]
            }
        },
        removeExistingCompany: (state: DataState, action: PayloadAction<string>) => {
            const index = state.selectedCompanies.indexOf(action.payload);
            if (index !== -1) {
                state.selectedCompanies.splice(index, 1);
            }
        },

        // currentPage
        setCurrentPage: (state: DataState, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        resetCurrentPage: (state: DataState) => {
            state.currentPage = 1;
        },

        // numberOfPages
        setNumberOfPages: (state: DataState, action: PayloadAction<number>) => {
            state.numberOfPages = action.payload;
        },
        resetNumberOfPages: (state: DataState) => {
            state.numberOfPages = 1;
        },

        // elementsPerPage
        setElementsPerPage: (state: DataState, action: PayloadAction<number>) => {
            state.elementsPerPage = action.payload;
        }
    }
});

export const {
    addNewCompany,
    removeExistingCompany,
    setCurrentPage,
    resetCurrentPage,
    setNumberOfPages,
    resetNumberOfPages,
    setElementsPerPage
} = userSelectionSlice.actions;
export default userSelectionSlice.reducer;
