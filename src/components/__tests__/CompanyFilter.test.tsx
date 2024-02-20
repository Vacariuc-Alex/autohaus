import {cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import CompanyFilter from "../CompanyFilter";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "../../utils/redux/productsReducer";
import {initialState} from "../../utils/constants/testConstants";
import wishListReducer from "../../utils/redux/wishListReducer";
import userSelectionReducer from "../../utils/redux/userSelectionReducer";

// Mock store
const mockStore = configureStore({
    reducer: {
        wishListStore: wishListReducer,
        productsStore: productsReducer,
        userSelectionStore: userSelectionReducer
    },
    preloadedState: initialState,
});

describe("CompanyFilter component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render CompanyFilter component", () => {
        render(
            <Provider store={mockStore}>
                <CompanyFilter/>
            </Provider>
        );
        const rightPanel = screen.getByTestId("right-panel");
        const formGroup = within(rightPanel).getByTestId("form-group");
        const formControlLabel = within(formGroup).getAllByTestId("form-control-label");
        const checkbox = within(formGroup).getAllByTestId("checkbox");

        expect(rightPanel).toBeInTheDocument();
        expect(formGroup).toBeInTheDocument();
        expect(formControlLabel.length).toBe(2);
        expect(checkbox.length).toBe(2);
    });

    test("Should check the checkbox and add the element to selectedCompanies and remove from selectedCompanies when uncheck checkbox", () => {
        render(
            <Provider store={mockStore}>
                <CompanyFilter/>
            </Provider>
        );

        const formGroup = screen.getByTestId("form-group");
        const formControlLabelOne = within(formGroup).getAllByTestId("form-control-label")[0];
        const checkbox = within(formControlLabelOne).getByTestId("checkbox");

        //check the checkbox
        fireEvent.click(checkbox);
        expect(mockStore.getState().userSelectionStore.selectedCompanies).toEqual(["UAZ"]);

        //uncheck the checkbox
        fireEvent.click(checkbox);
        expect(mockStore.getState().userSelectionStore.selectedCompanies).toEqual([]);
    });
});
