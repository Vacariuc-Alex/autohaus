import {cleanup, fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import {configureStore} from "@reduxjs/toolkit";
import wishListReducer from "src/utils/redux/wishListReducer";
import usersReducer from "src/utils/redux/usersReducer";
import productsReducer from "src/utils/redux/productsReducer";
import userSelectionReducer from "src/utils/redux/userSelectionReducer";
import {InitialState, initialState, mockedResponse, stubProductTwo, stubUser} from "src/utils/constants/testConstants";
import {
    deleteItemFromLocalStorage,
    setItemInLocalStorageWithExpiration
} from "src/utils/helpers/sessionStorageWithExpiration";
import {AUTHENTICATED_USER, DEFAULT_EXPIRATION_PERIOD, EMPTY_STRING, User} from "src/utils/constants/constants";
import {Provider} from "react-redux";
import Register from "src/pages/Register";
import {
    AVATAR,
    BACKGROUND_IMAGE_WRAPPER,
    BOX,
    BUTTON,
    CONTAINER,
    ERROR,
    FLEX,
    LINK_TO_LOGIN_PAGE,
    REGISTER,
    TEXT_FIELD,
    TEXTBOX,
    TYPOGRAPHY
} from "src/utils/constants/dataTestIds";
import {deepCopy} from "src/utils/helpers/deepCopy";
import React from "react";
import * as useAxios from "src/utils/hooks/useAxios"
import {USER_REGISTER_FAILED} from "src/utils/constants/alertMessages";
import {DUPLICATED_EMAIL, DUPLICATED_USERNAME, UNEXPECTED_SERVER_ERROR} from "src/utils/constants/errorMessages";

// Mock useAxios
jest.mock("src/utils/hooks/useAxios");
const mockedAxios = useAxios as jest.Mocked<typeof useAxios>;

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

describe("Register component", () => {
    beforeEach(() => {
        mockedAxios.default.mockImplementation(() => ({
            response: mockedResponse,
            error: EMPTY_STRING,
            loading: false,
            executeHttpRequest: jest.fn()
        }));
        setItemInLocalStorageWithExpiration(AUTHENTICATED_USER, stubUser, DEFAULT_EXPIRATION_PERIOD);
    });

    afterEach(() => {
        cleanup();
        deleteItemFromLocalStorage(AUTHENTICATED_USER);
    });

    test("Should render Register component", () => {
        render(
            <Provider store={mockStore}>
                <Register/>
            </Provider>
        );
        const register = screen.getByTestId(REGISTER);
        const backgroundImageWrapper = within(register).getByTestId(BACKGROUND_IMAGE_WRAPPER);
        const image = within(backgroundImageWrapper).getByRole("img");
        const container = within(register).getByTestId(CONTAINER);
        const boxes = within(container).getAllByTestId(BOX);
        const avatar = within(boxes[0]).getByTestId(AVATAR);
        const typography = within(boxes[0]).getByTestId(TYPOGRAPHY);
        const textFields = within(boxes[1]).getAllByTestId(TEXT_FIELD);
        const button = within(boxes[1]).getByTestId(BUTTON);
        const flex = within(boxes[1]).getByTestId(FLEX);
        const linkToRegistrationPage = within(flex).getByTestId(LINK_TO_LOGIN_PAGE);

        expect(register).toBeInTheDocument();
        expect(backgroundImageWrapper).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(container).toBeInTheDocument();
        expect(boxes.length).toEqual(2);
        expect(avatar).toBeInTheDocument();
        expect(typography).toBeInTheDocument();
        expect(typography).toHaveTextContent("Register");
        expect(textFields.length).toEqual(4);
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Register");
        expect(flex).toBeInTheDocument();
        expect(linkToRegistrationPage).toBeInTheDocument();
        expect(linkToRegistrationPage).toHaveTextContent("Already have an account?");
        expect(linkToRegistrationPage).toHaveAttribute("href", "/login");
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
                <Register/>
            </Provider>
        );

        expect(mockedDispatch).toHaveBeenCalled();
    });

    describe("Verify submitting the form", () => {
        test("Should successfully register when data is correct", async () => {
            render(
                <Provider store={mockStore}>
                    <Register/>
                </Provider>
            );
            const login = screen.getByTestId(REGISTER);
            const container = within(login).getByTestId(CONTAINER);
            const boxes = within(container).getAllByTestId(BOX);
            const textFields = within(boxes[1]).getAllByTestId(TEXT_FIELD);
            const button = within(boxes[1]).getByTestId(BUTTON);

            fireEvent.input(within(textFields[0]).getByRole(TEXTBOX), {target: {value: "user"}});
            expect(within(textFields[0]).getByRole(TEXTBOX)).toHaveValue("user");
            fireEvent.input(within(textFields[1]).getByRole(TEXTBOX), {target: {value: "example@email.com"}});
            expect(within(textFields[1]).getByRole(TEXTBOX)).toHaveValue("example@email.com");
            fireEvent.input(within(textFields[2]).getByLabelText(/Password/i), {target: {value: "aA1!aaaa"}});
            expect(within(textFields[2]).getByLabelText(/Password/i)).toHaveValue("aA1!aaaa");
            fireEvent.input(within(textFields[3]).getByRole(TEXTBOX), {target: {value: "https://avatar.image.com/avatar.png"}});
            expect(within(textFields[3]).getByRole(TEXTBOX)).toHaveValue("https://avatar.image.com/avatar.png");

            fireEvent.click(button);
            await waitFor(() => {
                expect(mockedDispatch).toHaveBeenCalled();
            });
            await waitFor(() => {
                expect(mockedNavigate).toHaveBeenCalledWith("/home");
            });
        });

        test("Should throw UNEXPECTED_SERVER_ERROR when latest id is invalid", async () => {
            const copyInitialState: InitialState = deepCopy(initialState);
            const copyStubProduct: User = deepCopy(stubProductTwo);
            copyStubProduct.id = "x1x";
            copyInitialState.usersStore.responseData = [copyStubProduct];
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
                    <Register/>
                </Provider>
            );
            const login = screen.getByTestId(REGISTER);
            const container = within(login).getByTestId(CONTAINER);
            const boxes = within(container).getAllByTestId(BOX);
            const textFields = within(boxes[1]).getAllByTestId(TEXT_FIELD);
            const button = within(boxes[1]).getByTestId(BUTTON);

            fireEvent.input(within(textFields[0]).getByRole(TEXTBOX), {target: {value: "user"}});
            expect(within(textFields[0]).getByRole(TEXTBOX)).toHaveValue("user");
            fireEvent.input(within(textFields[1]).getByRole(TEXTBOX), {target: {value: "example@email.com"}});
            expect(within(textFields[1]).getByRole(TEXTBOX)).toHaveValue("example@email.com");
            fireEvent.input(within(textFields[2]).getByLabelText(/Password/i), {target: {value: "aA1!aaaa"}});
            expect(within(textFields[2]).getByLabelText(/Password/i)).toHaveValue("aA1!aaaa");
            fireEvent.input(within(textFields[3]).getByRole(TEXTBOX), {target: {value: "https://avatar.image.com/avatar.png"}});
            expect(within(textFields[3]).getByRole(TEXTBOX)).toHaveValue("https://avatar.image.com/avatar.png");

            fireEvent.click(button);
            await waitFor(() => {
                expect(global.alert).toHaveBeenCalledWith(UNEXPECTED_SERVER_ERROR);
            });
        });

        test("Should set latest id as 1 when there are no users", async () => {
            const copyInitialState: InitialState = deepCopy(initialState);
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
                    <Register/>
                </Provider>
            );
            const login = screen.getByTestId(REGISTER);
            const container = within(login).getByTestId(CONTAINER);
            const boxes = within(container).getAllByTestId(BOX);
            const textFields = within(boxes[1]).getAllByTestId(TEXT_FIELD);
            const button = within(boxes[1]).getByTestId(BUTTON);

            fireEvent.input(within(textFields[0]).getByRole(TEXTBOX), {target: {value: "user"}});
            expect(within(textFields[0]).getByRole(TEXTBOX)).toHaveValue("user");
            fireEvent.input(within(textFields[1]).getByRole(TEXTBOX), {target: {value: "example@email.com"}});
            expect(within(textFields[1]).getByRole(TEXTBOX)).toHaveValue("example@email.com");
            fireEvent.input(within(textFields[2]).getByLabelText(/Password/i), {target: {value: "aA1!aaaa"}});
            expect(within(textFields[2]).getByLabelText(/Password/i)).toHaveValue("aA1!aaaa");
            fireEvent.input(within(textFields[3]).getByRole(TEXTBOX), {target: {value: "https://avatar.image.com/avatar.png"}});
            expect(within(textFields[3]).getByRole(TEXTBOX)).toHaveValue("https://avatar.image.com/avatar.png");

            fireEvent.click(button);
            await waitFor(() => {
                expect(mockedDispatch).toHaveBeenCalled();
            });
            await waitFor(() => {
                expect(mockedNavigate).toHaveBeenCalledWith("/home");
            });
        });

        test("Should alert when input data is incorrect", async () => {
            render(
                <Provider store={mockStore}>
                    <Register/>
                </Provider>
            );
            const login = screen.getByTestId(REGISTER);
            const container = within(login).getByTestId(CONTAINER);
            const boxes = within(container).getAllByTestId(BOX);
            const textFields = within(boxes[1]).getAllByTestId(TEXT_FIELD);
            const button = within(boxes[1]).getByTestId(BUTTON);

            fireEvent.input(within(textFields[0]).getByRole(TEXTBOX), {target: {value: "user"}});
            expect(within(textFields[0]).getByRole(TEXTBOX)).toHaveValue("user");
            fireEvent.input(within(textFields[1]).getByRole(TEXTBOX), {target: {value: "incorrectEmailFormat"}});
            expect(within(textFields[1]).getByRole(TEXTBOX)).toHaveValue("incorrectEmailFormat");
            fireEvent.input(within(textFields[2]).getByLabelText(/Password/i), {target: {value: "aA1!aaaa"}});
            expect(within(textFields[2]).getByLabelText(/Password/i)).toHaveValue("aA1!aaaa");
            fireEvent.click(button);

            await waitFor(() => {
                expect(global.alert).toHaveBeenCalledWith("email must be a valid email");
            });
        });
    });

    describe("Verify exception when entered user already exists", () => {
        test("Should throe DUPLICATED_USERNAME when username is duplicated", async () => {
            render(
                <Provider store={mockStore}>
                    <Register/>
                </Provider>
            );
            const login = screen.getByTestId(REGISTER);
            const container = within(login).getByTestId(CONTAINER);
            const boxes = within(container).getAllByTestId(BOX);
            const textFields = within(boxes[1]).getAllByTestId(TEXT_FIELD);
            const button = within(boxes[1]).getByTestId(BUTTON);

            fireEvent.input(within(textFields[0]).getByRole(TEXTBOX), {target: {value: "Test"}});
            expect(within(textFields[0]).getByRole(TEXTBOX)).toHaveValue("Test");
            fireEvent.input(within(textFields[1]).getByRole(TEXTBOX), {target: {value: "example@email.com"}});
            expect(within(textFields[1]).getByRole(TEXTBOX)).toHaveValue("example@email.com");
            fireEvent.input(within(textFields[2]).getByLabelText(/Password/i), {target: {value: "aA1!aaaa"}});
            expect(within(textFields[2]).getByLabelText(/Password/i)).toHaveValue("aA1!aaaa");
            fireEvent.input(within(textFields[3]).getByRole(TEXTBOX), {target: {value: "https://avatar.image.com/avatar.png"}});
            expect(within(textFields[3]).getByRole(TEXTBOX)).toHaveValue("https://avatar.image.com/avatar.png");

            fireEvent.click(button);
            await waitFor(() => {
                expect(global.alert).toHaveBeenCalledWith(DUPLICATED_USERNAME);
            });
        });

        test("Should throe DUPLICATED_EMAIL when username is duplicated", async () => {
            render(
                <Provider store={mockStore}>
                    <Register/>
                </Provider>
            );
            const login = screen.getByTestId(REGISTER);
            const container = within(login).getByTestId(CONTAINER);
            const boxes = within(container).getAllByTestId(BOX);
            const textFields = within(boxes[1]).getAllByTestId(TEXT_FIELD);
            const button = within(boxes[1]).getByTestId(BUTTON);

            fireEvent.input(within(textFields[0]).getByRole(TEXTBOX), {target: {value: "user"}});
            expect(within(textFields[0]).getByRole(TEXTBOX)).toHaveValue("user");
            fireEvent.input(within(textFields[1]).getByRole(TEXTBOX), {target: {value: "test@example.com"}});
            expect(within(textFields[1]).getByRole(TEXTBOX)).toHaveValue("test@example.com");
            fireEvent.input(within(textFields[2]).getByLabelText(/Password/i), {target: {value: "aA1!aaaa"}});
            expect(within(textFields[2]).getByLabelText(/Password/i)).toHaveValue("aA1!aaaa");
            fireEvent.input(within(textFields[3]).getByRole(TEXTBOX), {target: {value: "https://avatar.image.com/avatar.png"}});
            expect(within(textFields[3]).getByRole(TEXTBOX)).toHaveValue("https://avatar.image.com/avatar.png");

            fireEvent.click(button);
            await waitFor(() => {
                expect(global.alert).toHaveBeenCalledWith(DUPLICATED_EMAIL);
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
                    <Register/>
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
                    <Register/>
                </Provider>
            );
            const error = screen.getByTestId(ERROR);

            expect(error).toBeInTheDocument();
            expect(error).toHaveTextContent(`Error: ${copyInitialState.usersStore.error}`);
        });

        describe("Should alert and reload page", () => {
            test("When axios received error", async () => {
                mockedAxios.default.mockImplementation(() => ({
                    response: null,
                    error: "Error",
                    loading: false,
                    executeHttpRequest: jest.fn()
                }));
                render(
                    <Provider store={mockStore}>
                        <Register/>
                    </Provider>
                );

                expect(global.alert).toHaveBeenCalledWith(`${USER_REGISTER_FAILED} Error`);
            });

            test("When axios received response", async () => {
                //Mocked response is already set in beforeEach
                render(
                    <Provider store={mockStore}>
                        <Register/>
                    </Provider>
                );

                expect(mockedDispatch).toHaveBeenCalled();
            });
        });
    });
});
