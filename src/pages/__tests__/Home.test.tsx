import {cleanup, render, screen, within} from "@testing-library/react";
import Home from "src/pages/Home";
import React from "react";
import {InitialState, initialState} from "src/utils/constants/testConstants";
import productsReducer from "src/utils/redux/productsReducer";
import wishListReducer from "src/utils/redux/wishListReducer";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {deepCopy} from "src/utils/helpers/deepCopy";
import {
    APP_BAR,
    BOX,
    BOX_COMPONENT,
    CARD,
    CONTENT_CANVAS, ERROR,
    FLEX,
    PAGINATION_STACK,
    RIGHT_PANEL
} from "src/utils/constants/dataTestIds";
import userSelectionReducer, {addNewCompany, removeExistingCompany} from "src/utils/redux/userSelectionReducer";
import usersReducer from "src/utils/redux/usersReducer";

//Mock store
const mockStore = configureStore({
    reducer: {
        wishListStore: wishListReducer,
        usersStore: usersReducer,
        productsStore: productsReducer,
        userSelectionStore: userSelectionReducer
    },
    preloadedState: initialState,
});

//Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate
}));

describe("Home component", () => {
    afterEach(() => {
        cleanup();
    });

    describe("Should render Home component", () => {
        test("When no actions are performed", () => {
            render(
                <Provider store={mockStore}>
                    <Home/>
                </Provider>
            );
            const navbar = screen.getByTestId(APP_BAR);
            const flex = screen.getByTestId(FLEX);
            const contentCanvas = within(flex).getByTestId(CONTENT_CANVAS);
            const cards = within(contentCanvas).getAllByTestId(CARD);
            const rightPanel = within(flex).getByTestId(RIGHT_PANEL);
            const boxComponent = screen.getByTestId(BOX_COMPONENT);
            const paginationStack = screen.getByTestId(PAGINATION_STACK);

            expect(navbar).toBeInTheDocument();
            expect(flex).toBeInTheDocument();
            expect(contentCanvas).toBeInTheDocument();
            expect(cards.length).toBe(2);
            expect(rightPanel).toBeInTheDocument();
            expect(boxComponent).toBeInTheDocument();
            expect(paginationStack).toBeInTheDocument();
        });

        test("When a company is selected", () => {
            mockStore.dispatch(addNewCompany("UAZ"))
            render(
                <Provider store={mockStore}>
                    <Home/>
                </Provider>
            );
            const navbar = screen.getByTestId(APP_BAR);
            const flex = screen.getByTestId(FLEX);
            const contentCanvas = within(flex).getByTestId(CONTENT_CANVAS);
            const cards = within(contentCanvas).getAllByTestId(CARD);
            const rightPanel = within(flex).getByTestId(RIGHT_PANEL);
            const boxComponent = screen.getByTestId(BOX_COMPONENT);
            const paginationStack = screen.getByTestId(PAGINATION_STACK);

            expect(navbar).toBeInTheDocument();
            expect(flex).toBeInTheDocument();
            expect(contentCanvas).toBeInTheDocument();
            expect(cards.length).toBe(1);
            expect(rightPanel).toBeInTheDocument();
            expect(boxComponent).toBeInTheDocument();
            expect(paginationStack).toBeInTheDocument();
        });
        mockStore.dispatch(removeExistingCompany("UAZ"))
    });

    describe("Verify request execution with loading and error states", () => {
        test("Should display Loading component", () => {
            const copyInitialState: InitialState = deepCopy(initialState);
            copyInitialState.productsStore.isRequestExecuted = false;
            copyInitialState.productsStore.loading = true;
            const copyMockStore = configureStore({
                reducer: {
                    wishListStore: wishListReducer,
                    usersStore: usersReducer,
                    productsStore: productsReducer,
                    userSelectionStore: userSelectionReducer
                },
                preloadedState: copyInitialState
            });

            render(
                <Provider store={copyMockStore}>
                    <Home/>
                </Provider>
            );
            const loading = screen.getByTestId(BOX);

            expect(loading).toBeInTheDocument();
        });

        test("Should display error message when usersStore error", () => {
            const copyInitialState: InitialState = deepCopy(initialState);
            copyInitialState.usersStore.error = "Mock error";
            const copyMockStore = configureStore({
                reducer: {
                    wishListStore: wishListReducer,
                    usersStore: usersReducer,
                    productsStore: productsReducer,
                    userSelectionStore: userSelectionReducer
                },
                preloadedState: copyInitialState
            });

            render(
                <Provider store={copyMockStore}>
                    <Home/>
                </Provider>
            );
            const error = screen.getByTestId(ERROR);

            expect(error).toBeInTheDocument();
            expect(error).toHaveTextContent(`Error: ${copyInitialState.usersStore.error}`);
        });

        test("Should display error message when productsStore error", () => {
            const copyInitialState: InitialState = deepCopy(initialState);
            copyInitialState.productsStore.error = "Mock error";
            const copyMockStore = configureStore({
                reducer: {
                    wishListStore: wishListReducer,
                    usersStore: usersReducer,
                    productsStore: productsReducer,
                    userSelectionStore: userSelectionReducer
                },
                preloadedState: copyInitialState
            });

            render(
                <Provider store={copyMockStore}>
                    <Home/>
                </Provider>
            );
            const error = screen.getByTestId(ERROR);

            expect(error).toBeInTheDocument();
            expect(error).toHaveTextContent(`Error: ${copyInitialState.productsStore.error}`);
        });

        test("Should display error message when productsStore and usersStore error", () => {
            const copyInitialState: InitialState = deepCopy(initialState);
            copyInitialState.productsStore.error = "Mock error";
            copyInitialState.usersStore.error = "Mock error";
            const copyMockStore = configureStore({
                reducer: {
                    wishListStore: wishListReducer,
                    usersStore: usersReducer,
                    productsStore: productsReducer,
                    userSelectionStore: userSelectionReducer
                },
                preloadedState: copyInitialState
            });

            render(
                <Provider store={copyMockStore}>
                    <Home/>
                </Provider>
            );
            const error = screen.getByTestId(ERROR);

            expect(error).toBeInTheDocument();
            expect(error).toHaveTextContent(
                `Error: ${copyInitialState.productsStore.error}, ${copyInitialState.usersStore.error}`);
        });
    });
});
