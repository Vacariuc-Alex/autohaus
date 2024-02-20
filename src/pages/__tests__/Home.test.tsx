import {cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import Home from "../Home";
import React from "react";
import {InitialState, initialState} from "../../utils/constants/testConstants";
import productsReducer from "../../utils/redux/productsReducer";
import wishListReducer from "../../utils/redux/wishListReducer";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import deepCopy from "../../utils/helpers/deepCopy";
import renderer from "react-test-renderer";
import Wishlist from "../Wishlist";
import userSelectionReducer from "../../utils/redux/userSelectionReducer";

//Mock store
const mockStore = configureStore({
    reducer: {
        wishListStore: wishListReducer,
        productsStore: productsReducer,
        userSelectionStore: userSelectionReducer
    },
    preloadedState: initialState,
});

//Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));
describe("Home component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render Home component", () => {
        render(
            <Provider store={mockStore}>
                <Home/>
            </Provider>
        );
        const navbar = screen.getByTestId("app-bar");
        const flex = screen.getByTestId("flex");
        const contentCanvas = within(flex).getByTestId("content-canvas");
        const cards = within(contentCanvas).getAllByTestId("card");
        const rightPanel = within(flex).getByTestId("right-panel");
        const boxComponent = screen.getByTestId("box-component");
        const paginationStack = screen.getByTestId("pagination-stack");

        expect(navbar).toBeInTheDocument();
        expect(flex).toBeInTheDocument();
        expect(contentCanvas).toBeInTheDocument();
        expect(cards.length).toBe(2);
        expect(rightPanel).toBeInTheDocument();
        expect(boxComponent).toBeInTheDocument();
        expect(paginationStack).toBeInTheDocument();
    });

    describe("Verify request execution with loading and error states", () => {
        test("Should display Loading component", () => {
            const copyInitialState: InitialState = deepCopy(initialState);
            copyInitialState.productsStore.isRequestExecuted = false;
            copyInitialState.productsStore.loading = true;
            const copyMockStore = configureStore({
                reducer: {
                    wishListStore: wishListReducer,
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
            const loading = screen.getByTestId("box");

            expect(loading).toBeInTheDocument();
        });

        test("Should display error message", () => {
            const copyInitialState: InitialState = deepCopy(initialState);
            copyInitialState.productsStore.error = "Mock error";

            const copyMockStore = configureStore({
                reducer: {
                    wishListStore: wishListReducer,
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

            const error = screen.getByTestId("error");

            expect(error).toBeInTheDocument();
            expect(error).toHaveTextContent(`Error: ${copyInitialState.productsStore.error}`);
        });
    });

    describe("Verify handlers", () => {
        test("Verify handleCompanies", () => {
            render(
                <Provider store={mockStore}>
                    <Home/>
                </Provider>
            );

            const flex = screen.getByTestId("flex");
            const rightPanel = within(flex).getByTestId("right-panel");
            const formGroup = within(rightPanel).getByTestId("form-group");
            const formControlLabelOne = within(formGroup).getAllByTestId("form-control-label")[0];
            const checkbox = within(formControlLabelOne).getByRole("checkbox");

            fireEvent.click(checkbox);
        });

        test("Verify handleCurrentPage", () => {
            render(
                <Provider store={mockStore}>
                    <Home/>
                </Provider>
            );

            const paginationStack = screen.getByTestId("pagination-stack");
            const paginationComponent = within(paginationStack).getByTestId("pagination-component");
            const paginationItems = within(paginationComponent).getAllByTestId("pagination-item")[1];

            fireEvent.click(paginationItems);
        });

        test("Verify handleElementsPerPageChange", () => {
            render(
                <Provider store={mockStore}>
                    <Home/>
                </Provider>
            );

            const selectComponent = screen.getByTestId("select-component");
            const button = within(selectComponent).getByRole("combobox");
            fireEvent.mouseDown(button);

            const presentation = screen.getByRole("presentation");
            const listbox = within(presentation).getByRole("listbox");
            const menuItem = within(listbox).getAllByTestId("menu-item")[1];
            fireEvent.click(menuItem);
        });
    });

    test("Should match snapshot", () => {
        const structure = renderer
            .create(
                <Provider store={mockStore}>
                    <Wishlist/>
                </Provider>
            )
            .toJSON();
        expect(structure).toMatchSnapshot();
    });
});
