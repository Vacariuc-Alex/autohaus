import React from 'react';
import {act, cleanup, fireEvent, render, screen, within} from '@testing-library/react';
import BasicPagination from '../BasicPagination';
import {configureStore} from "@reduxjs/toolkit";
import wishListReducer from "../../utils/redux/wishListReducer";
import productsReducer from "../../utils/redux/productsReducer";
import userSelectionReducer, {
    resetCurrentPage,
    resetNumberOfPages,
    setCurrentPage,
    setNumberOfPages
} from "../../utils/redux/userSelectionReducer";
import {initialState} from "../../utils/constants/testConstants";
import {Provider} from "react-redux";

//Test data
const paginationItemsData = [[1, 1], [2, 2], [3, 3]];

// Mock store
const mockStore = configureStore({
    reducer: {
        wishListStore: wishListReducer,
        productsStore: productsReducer,
        userSelectionStore: userSelectionReducer
    },
    preloadedState: initialState,
});

// Simplified redux variables
const numberOfPages = mockStore.getState().userSelectionStore.numberOfPages;

describe("BasicPagination component", () => {
    afterEach(() => {
        act(() => {
            mockStore.dispatch(resetCurrentPage());
            mockStore.dispatch(resetNumberOfPages());
        });
        cleanup();
    });

    test("Should render BasicPagination", () => {
        render(
            <Provider store={mockStore}>
                <BasicPagination/>
            </Provider>
        );
        const paginationStack = screen.getByTestId("pagination-stack");
        const paginationComponent = within(paginationStack).getByTestId("pagination-component");
        const paginationItems = within(paginationComponent).getAllByTestId("pagination-item");

        expect(paginationStack).toBeInTheDocument();
        expect(paginationComponent).toBeInTheDocument();
        expect(paginationItems.length).toBe(numberOfPages + 2);
    });

    test.each(paginationItemsData)("Should select an element which represents page number when it is clicked", (
        pageValue, pageIndex) => {
        mockStore.dispatch(setNumberOfPages(3));
        render(
            <Provider store={mockStore}>
                <BasicPagination/>
            </Provider>
        );
        const paginationStack = screen.getByTestId("pagination-stack");
        const paginationComponent = within(paginationStack).getByTestId("pagination-component");
        const paginationItems = within(paginationComponent).getAllByTestId("pagination-item");

        fireEvent.click(paginationItems[pageIndex]);
        expect(paginationItems[pageIndex].textContent).toEqual(String(pageValue));
        expect(mockStore.getState().userSelectionStore.currentPage).toEqual(pageValue);
    });

    test("Should select next page element when forward arrow is clicked " +
        "and then previous page element when back arrow is clicked", () => {
        mockStore.dispatch(setNumberOfPages(3));
        render(
            <Provider store={mockStore}>
                <BasicPagination/>
            </Provider>
        );
        const arrowForwardIcon = screen.getByTestId("arrow-forward-icon");
        fireEvent.click(arrowForwardIcon);
        expect(mockStore.getState().userSelectionStore.currentPage).toEqual(2);

        const arrowBackIcon = screen.getByTestId("arrow-back-icon");
        fireEvent.click(arrowBackIcon);
        expect(mockStore.getState().userSelectionStore.currentPage).toEqual(1);
    });

    test("Should not select next or previous pages if numberOfPages is smaller than the currentPage", () => {
        render(
            <Provider store={mockStore}>
                <BasicPagination/>
            </Provider>
        );
        const arrowForwardIcon = screen.getByTestId("arrow-forward-icon");
        fireEvent.click(arrowForwardIcon);
        expect(mockStore.getState().userSelectionStore.currentPage).toEqual(1);

        const arrowBackIcon = screen.getByTestId("arrow-back-icon");
        fireEvent.click(arrowBackIcon);
        expect(mockStore.getState().userSelectionStore.currentPage).toEqual(1);
    });

    test("Should reset currentPage when numberOfPages is larger than numberOfPages", () => {
        mockStore.dispatch(setCurrentPage(999));
        render(
            <Provider store={mockStore}>
                <BasicPagination/>
            </Provider>
        );
        expect(mockStore.getState().userSelectionStore.currentPage).toEqual(1);
    });
});
