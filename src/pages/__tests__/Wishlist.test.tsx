import {act, cleanup, render, screen, within} from "@testing-library/react";
import Wishlist from "../Wishlist";
import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import wishListReducer, {addItem, removeItem} from "../../utils/redux/wishListReducer";
import productsReducer from "../../utils/redux/productsReducer";
import {configureStore} from "@reduxjs/toolkit";
import {initialState} from "../../utils/constants/testConstants";
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

describe("Wishlist component", () => {
    afterEach(() => {
        act(() => {
            mockStore.dispatch(removeItem(1));
            mockStore.dispatch(removeItem(2));
        });
        cleanup();
    });

    test("Should render Wishlist component", () => {
        mockStore.dispatch(addItem(1));
        mockStore.dispatch(addItem(2));
        expect(mockStore.getState().wishListStore.ids).toEqual([1, 2]);

        render(
            <Provider store={mockStore}>
                <Wishlist/>
            </Provider>
        );

        const navbar = screen.getByTestId("app-bar");
        const contentCanvas = screen.getByTestId("content-canvas");
        const cards = within(contentCanvas).getAllByTestId("card");

        expect(navbar).toBeInTheDocument();
        expect(contentCanvas).toBeInTheDocument();
        expect(cards.length).toBe(2);
    });

    test("Should render Wishlist component with no elements", () => {
        render(
            <Provider store={mockStore}>
                <Wishlist/>
            </Provider>
        );
        const contentCanvas = screen.getByTestId("content-canvas");
        const noItemsComponent = within(contentCanvas).getByTestId("no-item-container");

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
