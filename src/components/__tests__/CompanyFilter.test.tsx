import {cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import CompanyFilter from "src/components/CompanyFilter";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "src/utils/redux/productsReducer";
import {initialState} from "src/utils/constants/testConstants";
import wishListReducer from "src/utils/redux/wishListReducer";
import userSelectionReducer from "src/utils/redux/userSelectionReducer";
import {CHECKBOX, FORM_CONTROL_LABEL, FORM_GROUP, RIGHT_PANEL} from "src/utils/constants/dataTestIds";
import usersReducer from "src/utils/redux/usersReducer";

// Mock store
const mockStore = configureStore({
    reducer: {
        wishListStore: wishListReducer,
        usersStore: usersReducer,
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
        const rightPanel = screen.getByTestId(RIGHT_PANEL);
        const formGroup = within(rightPanel).getByTestId(FORM_GROUP);
        const formControlLabel = within(formGroup).getAllByTestId(FORM_CONTROL_LABEL);
        const checkbox = within(formGroup).getAllByTestId(CHECKBOX);

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

        const formGroup = screen.getByTestId(FORM_GROUP);
        const formControlLabelOne = within(formGroup).getAllByTestId(FORM_CONTROL_LABEL)[0];
        const checkbox = within(formControlLabelOne).getByTestId(CHECKBOX);

        //check the checkbox
        fireEvent.click(checkbox);
        expect(mockStore.getState().userSelectionStore.selectedCompanies).toEqual(["UAZ"]);

        //uncheck the checkbox
        fireEvent.click(checkbox);
        expect(mockStore.getState().userSelectionStore.selectedCompanies).toEqual([]);
    });
});
