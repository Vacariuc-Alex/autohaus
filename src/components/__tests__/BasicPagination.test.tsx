import React from "react";
import {act, cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import BasicPagination from "src/components/BasicPagination";
import {configureStore} from "@reduxjs/toolkit";
import wishListReducer from "src/utils/redux/wishListReducer";
import productsReducer from "src/utils/redux/productsReducer";
import userSelectionReducer, {
    resetCurrentPage,
    resetNumberOfPages,
    setCurrentPage,
    setNumberOfPages
} from "src/utils/redux/userSelectionReducer";
import {initialState} from "src/utils/constants/testConstants";
import {Provider} from "react-redux";
import {
    ARROW_BACK_ICON,
    ARROW_FORWARD_ICON,
    PAGINATION_COMPONENT,
    PAGINATION_ITEM,
    PAGINATION_STACK
} from "src/utils/constants/dataTestIds";
import usersReducer from "src/utils/redux/usersReducer";

//Test data
const paginationItemsData = [[1, 1], [2, 2], [3, 3]];

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
        const paginationStack = screen.getByTestId(PAGINATION_STACK);
        const paginationComponent = within(paginationStack).getByTestId(PAGINATION_COMPONENT);
        const paginationItems = within(paginationComponent).getAllByTestId(PAGINATION_ITEM);

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
        const paginationStack = screen.getByTestId(PAGINATION_STACK);
        const paginationComponent = within(paginationStack).getByTestId(PAGINATION_COMPONENT);
        const paginationItems = within(paginationComponent).getAllByTestId(PAGINATION_ITEM);

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
        const arrowForwardIcon = screen.getByTestId(ARROW_FORWARD_ICON);
        fireEvent.click(arrowForwardIcon);
        expect(mockStore.getState().userSelectionStore.currentPage).toEqual(2);

        const arrowBackIcon = screen.getByTestId(ARROW_BACK_ICON);
        fireEvent.click(arrowBackIcon);
        expect(mockStore.getState().userSelectionStore.currentPage).toEqual(1);
    });

    test("Should not select next or previous pages if numberOfPages is smaller than the currentPage", () => {
        render(
            <Provider store={mockStore}>
                <BasicPagination/>
            </Provider>
        );
        const arrowForwardIcon = screen.getByTestId(ARROW_FORWARD_ICON);
        fireEvent.click(arrowForwardIcon);
        expect(mockStore.getState().userSelectionStore.currentPage).toEqual(1);

        const arrowBackIcon = screen.getByTestId(ARROW_BACK_ICON);
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
