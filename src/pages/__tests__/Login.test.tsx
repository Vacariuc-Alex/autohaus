import {cleanup, fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import {configureStore} from "@reduxjs/toolkit";
import wishListReducer from "src/utils/redux/wishListReducer";
import usersReducer from "src/utils/redux/usersReducer";
import productsReducer from "src/utils/redux/productsReducer";
import userSelectionReducer from "src/utils/redux/userSelectionReducer";
import {InitialState, initialState} from "src/utils/constants/testConstants";
import {Provider} from "react-redux";
import Login from "src/pages/Login";
import {
    AVATAR,
    BACKGROUND_IMAGE_WRAPPER,
    BOX,
    BUTTON,
    CONTAINER,
    ERROR,
    FLEX,
    LINK_TO_REGISTRATION_PAGE,
    LOGIN,
    TEXT_FIELD,
    TEXTBOX,
    TYPOGRAPHY
} from "src/utils/constants/dataTestIds";
import {deepCopy} from "src/utils/helpers/deepCopy";
import {UNEXPECTED_SERVER_ERROR} from "src/utils/constants/errorMessages";
import React from "react";

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate
}));

// Mock useDispatch
const mockedDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockedDispatch
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

// Mock windows functions
global.alert = jest.fn();

describe("Login component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render Login component", () => {
        render(
            <Provider store={mockStore}>
                <Login/>
            </Provider>
        );
        const login = screen.getByTestId(LOGIN);
        const backgroundImageWrapper = within(login).getByTestId(BACKGROUND_IMAGE_WRAPPER);
        const image = within(backgroundImageWrapper).getByRole("img");
        const container = within(login).getByTestId(CONTAINER);
        const boxes = within(container).getAllByTestId(BOX);
        const avatar = within(boxes[0]).getByTestId(AVATAR);
        const typography = within(boxes[0]).getByTestId(TYPOGRAPHY);
        const textFields = within(boxes[1]).getAllByTestId(TEXT_FIELD);
        const button = within(boxes[1]).getByTestId(BUTTON);
        const flex = within(boxes[1]).getByTestId(FLEX);
        const linkToRegistrationPage = within(flex).getByTestId(LINK_TO_REGISTRATION_PAGE);

        expect(login).toBeInTheDocument();
        expect(backgroundImageWrapper).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(container).toBeInTheDocument();
        expect(boxes.length).toEqual(2);
        expect(avatar).toBeInTheDocument();
        expect(typography).toBeInTheDocument();
        expect(typography).toHaveTextContent("Login");
        expect(textFields.length).toEqual(2);
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Login");
        expect(flex).toBeInTheDocument();
        expect(linkToRegistrationPage).toBeInTheDocument();
        expect(linkToRegistrationPage).toHaveTextContent("Don't have an account?");
        expect(linkToRegistrationPage).toHaveAttribute("href", "/register");
    });

    test("Should fetch data request when userResponseData is empty and isRequestExecuted is false", () => {
        const copyInitialState: InitialState = deepCopy(initialState);
        copyInitialState.usersStore.isRequestExecuted = false;
        copyInitialState.usersStore.responseData = [];
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
                <Login/>
            </Provider>
        );

        expect(mockedDispatch).toHaveBeenCalled();
    });

    describe("Verify submitting the form", () => {
        test("Should successfully login when data is correct", async () => {
            render(
                <Provider store={mockStore}>
                    <Login/>
                </Provider>
            );
            const login = screen.getByTestId(LOGIN);
            const container = within(login).getByTestId(CONTAINER);
            const boxes = within(container).getAllByTestId(BOX);
            const textFields = within(boxes[1]).getAllByTestId(TEXT_FIELD);
            const button = within(boxes[1]).getByTestId(BUTTON);

            fireEvent.input(within(textFields[0]).getByRole(TEXTBOX), {target: {value: "user"}});
            expect(within(textFields[0]).getByRole(TEXTBOX)).toHaveValue("user");

            fireEvent.input(within(textFields[1]).getByLabelText(/Password/i), {target: {value: "password"}});
            expect(within(textFields[1]).getByLabelText(/Password/i)).toHaveValue("password");

            fireEvent.click(button);
            await waitFor(() => {
                expect(mockedDispatch).toHaveBeenCalled();
            });
            await waitFor(() => {
                expect(mockedNavigate).toHaveBeenCalledWith("/home");
            });
        });

        test("Should alert when login data is incorrect", async () => {
            mockedDispatch.mockImplementationOnce(jest.fn(() => {
                throw new Error(UNEXPECTED_SERVER_ERROR);
            }));
            render(
                <Provider store={mockStore}>
                    <Login/>
                </Provider>
            );
            const login = screen.getByTestId(LOGIN);
            const container = within(login).getByTestId(CONTAINER);
            const boxes = within(container).getAllByTestId(BOX);
            const textFields = within(boxes[1]).getAllByTestId(TEXT_FIELD);
            const button = within(boxes[1]).getByTestId(BUTTON);

            fireEvent.input(within(textFields[0]).getByRole(TEXTBOX), {target: {value: "user"}});
            expect(within(textFields[0]).getByRole(TEXTBOX)).toHaveValue("user");
            fireEvent.input(within(textFields[1]).getByLabelText(/Password/i), {target: {value: "password"}});
            expect(within(textFields[1]).getByLabelText(/Password/i)).toHaveValue("password");
            fireEvent.click(button);

            await waitFor(() => {
                expect(global.alert).toHaveBeenCalledWith(UNEXPECTED_SERVER_ERROR);
            });
        });
    });

    describe("Verify request execution with loading and error states", () => {
        test("Should display Loading component", () => {
            const copyInitialState: InitialState = deepCopy(initialState);
            copyInitialState.usersStore.isRequestExecuted = false;
            copyInitialState.usersStore.loading = true;
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
                    <Login/>
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
                    <Login/>
                </Provider>
            );
            const error = screen.getByTestId(ERROR);

            expect(error).toBeInTheDocument();
            expect(error).toHaveTextContent(`Error: ${copyInitialState.usersStore.error}`);
        });
    });
});
