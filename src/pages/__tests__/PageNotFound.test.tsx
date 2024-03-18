import {cleanup, render, screen, within} from "@testing-library/react";
import PageNotFound from "src/pages/PageNotFound";
import React from "react";
import {APP_BAR, IMG, PAGE_NOT_FOUND_CONTAINER, TYPOGRAPHY} from "src/utils/constants/dataTestIds";
import wishListReducer from "src/utils/redux/wishListReducer";
import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "src/utils/redux/usersReducer";
import productsReducer from "src/utils/redux/productsReducer";
import userSelectionReducer from "src/utils/redux/userSelectionReducer";
import {initialState} from "src/utils/constants/testConstants";
import {Provider} from "react-redux";

//Globals
const notFoundContainerMessages: { index: number, value: string }[] = [
    {index: 0, value: "404"},
    {index: 1, value: "Page Not Found!"},
    {index: 2, value: "Sorry, the page you're looking for does not exist!"}
];

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate
}));

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

describe("PageNotFound component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render PageNotFound component", () => {
        render(
            <Provider store={mockStore}>
                <PageNotFound/>
            </Provider>
        );
        const navbar = screen.getByTestId(APP_BAR);
        const notFoundContainer = screen.getByTestId(PAGE_NOT_FOUND_CONTAINER);
        const typographies = within(notFoundContainer).getAllByTestId(TYPOGRAPHY);
        const image = within(notFoundContainer).getByRole(IMG);

        expect(navbar).toBeInTheDocument();
        expect(notFoundContainer).toBeInTheDocument();
        expect(typographies.length).toBe(3);
        expect(image).toBeInTheDocument();

        typographies.forEach((e, i) => {
            expect(e).toHaveTextContent(notFoundContainerMessages[i].value);
        });
    });
});
