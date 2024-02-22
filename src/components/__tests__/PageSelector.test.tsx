import {cleanup, fireEvent, render, screen, within} from '@testing-library/react';
import PageSelector from "../PageSelector";
import React from "react";
import {configureStore} from "@reduxjs/toolkit";
import wishListReducer from "../../utils/redux/wishListReducer";
import userSelectionReducer from "../../utils/redux/userSelectionReducer";
import productsReducer from "../../utils/redux/productsReducer";
import {initialState} from "../../utils/constants/testConstants";
import {Provider} from "react-redux";

//Globals
const elementsPerPage = ["10", "20", "50", "100", "200", "500", "1000"];

// Mock store
const mockStore = configureStore({
    reducer: {
        wishListStore: wishListReducer,
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
        const boxComponent = screen.getByTestId("box-component");
        const formControl = screen.getByTestId("form-control");
        const inputLabel = screen.getByTestId("input-label");
        const selectComponent = screen.getByTestId("select-component");

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
        const selectComponent = screen.getByTestId("select-component");
        const button = within(selectComponent).getByRole("combobox");
        fireEvent.mouseDown(button);

        const presentation = screen.getByRole("presentation");
        const listbox = within(presentation).getByRole("listbox");
        const menuItems = within(listbox).getAllByTestId("menu-item");
        menuItems.forEach((e) => {
            expect(e).toBeInTheDocument();
            expect(elementsPerPage).toContain(e.textContent);
        });

        fireEvent.click(menuItems[1]);
        expect(mockStore.getState().userSelectionStore.elementsPerPage).toBe(20);
    });
});
