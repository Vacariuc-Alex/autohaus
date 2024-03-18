import {cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import PageSelector from "src/components/PageSelector";
import React from "react";
import {configureStore} from "@reduxjs/toolkit";
import wishListReducer from "src/utils/redux/wishListReducer";
import userSelectionReducer from "src/utils/redux/userSelectionReducer";
import productsReducer from "src/utils/redux/productsReducer";
import {initialState} from "src/utils/constants/testConstants";
import {Provider} from "react-redux";
import {
    BOX_COMPONENT,
    COMBOBOX,
    FORM_CONTROL,
    INPUT_LABEL,
    LISTBOX,
    MENU_ITEM,
    PRESENTATION,
    SELECT_COMPONENT
} from "src/utils/constants/dataTestIds";
import usersReducer from "src/utils/redux/usersReducer";

//Globals
const elementsPerPage = ["10", "20", "50", "100", "200", "500", "1000"];

// Mock store
const mockStore = configureStore({
    reducer: {
        wishListStore: wishListReducer,
        usersStore: usersReducer,
        productsStore: productsReducer,
        userSelectionStore: userSelectionReducer,
    },
    preloadedState: initialState,
});

describe("PageSelector component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render PageSelector component", () => {
        render(
            <Provider store={mockStore}>
                <PageSelector/>
            </Provider>
        );
        const boxComponent = screen.getByTestId(BOX_COMPONENT);
        const formControl = screen.getByTestId(FORM_CONTROL);
        const inputLabel = screen.getByTestId(INPUT_LABEL);
        const selectComponent = screen.getByTestId(SELECT_COMPONENT);

        expect(boxComponent).toBeInTheDocument();
        expect(formControl).toBeInTheDocument();
        expect(inputLabel).toBeInTheDocument();
        expect(inputLabel).toHaveTextContent("Elements per Page");
        expect(selectComponent).toBeInTheDocument();
        expect(selectComponent).toHaveTextContent("10");
    });

    test("Should display elements per page options when label is clicked and select second element with value 20", () => {
        render(
            <Provider store={mockStore}>
                <PageSelector/>
            </Provider>
        );
        const selectComponent = screen.getByTestId(SELECT_COMPONENT);
        const button = within(selectComponent).getByRole(COMBOBOX);
        fireEvent.mouseDown(button);

        const presentation = screen.getByRole(PRESENTATION);
        const listbox = within(presentation).getByRole(LISTBOX);
        const menuItems = within(listbox).getAllByTestId(MENU_ITEM);
        menuItems.forEach((e) => {
            expect(e).toBeInTheDocument();
            expect(elementsPerPage).toContain(e.textContent);
        });

        fireEvent.click(menuItems[1]);
        expect(mockStore.getState().userSelectionStore.elementsPerPage).toBe(20);
    });
});
