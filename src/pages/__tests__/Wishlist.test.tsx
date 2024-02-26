import {act, cleanup, render, screen, within} from "@testing-library/react";
import Wishlist from "src/pages/Wishlist";
import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import wishListReducer, {addItem, removeItem} from "src/utils/redux/wishListReducer";
import productsReducer from "src/utils/redux/productsReducer";
import {configureStore} from "@reduxjs/toolkit";
import {initialState} from "src/utils/constants/testConstants";
import {APP_BAR, CARD, CONTENT_CANVAS, NO_ITEMS_CONTAINER} from "src/utils/constants/dataTestIds";
import userSelectionReducer from "src/utils/redux/userSelectionReducer";

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
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate
}));

describe("Wishlist component", () => {
    afterEach(() => {
        act(() => {
            mockStore.dispatch(removeItem("1"));
            mockStore.dispatch(removeItem("2"));
        });
        cleanup();
    });

    test("Should render Wishlist component", () => {
        mockStore.dispatch(addItem("1"));
        mockStore.dispatch(addItem("2"));
        expect(mockStore.getState().wishListStore.ids).toEqual(["1", "2"]);

        render(
            <Provider store={mockStore}>
                <Wishlist/>
            </Provider>
        );

        const navbar = screen.getByTestId(APP_BAR);
        const contentCanvas = screen.getByTestId(CONTENT_CANVAS);
        const cards = within(contentCanvas).getAllByTestId(CARD);

        expect(navbar).toBeInTheDocument();
        expect(contentCanvas).toBeInTheDocument();
        expect(cards.length).toBe(2);
    });

    test("Should render Wishlist component when there are no favourite elements", () => {
        render(
            <Provider store={mockStore}>
                <Wishlist/>
            </Provider>
        );
        const contentCanvas = screen.getByTestId(CONTENT_CANVAS);
        const noItemsComponent = within(contentCanvas).getByTestId(NO_ITEMS_CONTAINER);

        expect(noItemsComponent).toBeInTheDocument();
    });

    test("Should render the Wishlist component if the product ID exists in the wishlist but the product itself doesn't", () => {
        mockStore.dispatch(addItem("3"));
        render(
            <Provider store={mockStore}>
                <Wishlist/>
            </Provider>
        );
        const contentCanvas = screen.getByTestId(CONTENT_CANVAS);
        const noItemsComponent = within(contentCanvas).getByTestId(NO_ITEMS_CONTAINER);

        expect(noItemsComponent).toBeInTheDocument();
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
