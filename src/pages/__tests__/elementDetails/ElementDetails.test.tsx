import {cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import ElementDetails from "src/pages/elementDetails/ElementDetails";
import {configureStore} from "@reduxjs/toolkit";
import wishListReducer from "src/utils/redux/wishListReducer";
import productsReducer from "src/utils/redux/productsReducer";
import userSelectionReducer from "src/utils/redux/userSelectionReducer";
import {
    assertedMockHeaders,
    InitialState,
    initialState,
    mockedResponse,
    stubUser
} from "src/utils/constants/testConstants";
import {Provider} from "react-redux";
import {
    APP_BAR,
    BUTTON,
    DIALOG,
    DIALOG_ACTIONS,
    ELEMENT_CONTROLS_CONTAINER,
    ELEMENT_DETAILS_CONTAINER,
    ELEMENT_DETAILS_PROPERTY_LIST,
    ELEMENT_PROPERTIES_CONTAINER
} from "src/utils/constants/dataTestIds";
import * as useAxios from "src/utils/hooks/useAxios";
import {deepCopy} from "src/utils/helpers/deepCopy";
import {AxiosResponse} from "axios";
import {
    FAILED_REQUEST,
    PRODUCT_DELETED_SUCCESSFULLY,
    PRODUCT_UPDATED_SUCCESSFULLY,
    UNKNOWN_REQUEST_TYPE
} from "src/utils/constants/alertMessages";
import React from "react";
import {delay} from "src/utils/helpers/delay";
import usersReducer from "src/utils/redux/usersReducer";
import {AUTHENTICATED_USER, DEFAULT_EXPIRATION_PERIOD, EMPTY_STRING} from "src/utils/constants/constants";
import {
    deleteItemFromLocalStorage,
    setItemInLocalStorageWithExpiration
} from "src/utils/helpers/sessionStorageWithExpiration";

// Mock useNavigate
// Mock useParams
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
        id: "MQ=="
    }),
    useRouteMatch: () => ({url: "/product/MQ=="}),
    useNavigate: () => jest.fn()
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

// Mock useAxios
jest.mock("src/utils/hooks/useAxios");
const mockedAxios = useAxios as jest.Mocked<typeof useAxios>;
const executeHttpRequestMock = jest.fn();

// Mock windows functions
global.alert = jest.fn();
global.close = jest.fn();
const reloadMock = jest.fn();
Object.defineProperty(window, "location", {
    value: {reload: reloadMock}
});

describe("ElementDetails component", () => {
    beforeEach(() => {
        setItemInLocalStorageWithExpiration(AUTHENTICATED_USER, stubUser, DEFAULT_EXPIRATION_PERIOD);
        mockedAxios.default.mockImplementation(() => ({
            response: mockedResponse,
            error: EMPTY_STRING,
            loading: false,
            executeHttpRequest: executeHttpRequestMock
        }));
    });

    afterEach(() => {
        cleanup();
        deleteItemFromLocalStorage(AUTHENTICATED_USER);
    });

    describe("Should render ElementDetails component", () => {
        test("With default mockStore", () => {
            render(
                <Provider store={mockStore}>
                    <ElementDetails/>
                </Provider>
            );
            const appBar = screen.getByTestId(APP_BAR);
            const elementDetailsContainer = screen.getByTestId(ELEMENT_DETAILS_CONTAINER);
            const elementDetailsPropertyList = within(elementDetailsContainer).getByTestId(ELEMENT_DETAILS_PROPERTY_LIST);
            const elementPropertiesContainer = within(elementDetailsPropertyList).getByTestId(ELEMENT_PROPERTIES_CONTAINER);
            const elementControlsContainer = within(elementDetailsPropertyList).getByTestId(ELEMENT_CONTROLS_CONTAINER);

            expect(appBar).toBeInTheDocument();
            expect(elementDetailsContainer).toBeInTheDocument();
            expect(elementDetailsPropertyList).toBeInTheDocument();
            expect(elementPropertiesContainer).toBeInTheDocument();
            expect(elementControlsContainer).toBeInTheDocument();
        });

        test("With empty responseData", () => {
            const copyInitialState: InitialState = deepCopy(initialState);
            copyInitialState.productsStore.responseData = [];
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
                    <ElementDetails/>
                </Provider>
            );
        });
    });

    describe("Should perform Http requests", () => {
        test("With put method", () => {
            let copyMockedResponse: AxiosResponse<any, any> = deepCopy(mockedResponse);
            copyMockedResponse.config = {headers: assertedMockHeaders, method: "put"};
            mockedAxios.default.mockImplementation(() => ({
                response: copyMockedResponse,
                error: EMPTY_STRING,
                loading: false,
                executeHttpRequest: jest.fn()
            }));
            render(
                <Provider store={mockStore}>
                    <ElementDetails/>
                </Provider>
            );

            expect(global.alert).toHaveBeenCalledWith(PRODUCT_UPDATED_SUCCESSFULLY);
            expect(reloadMock).toHaveBeenCalled();
        });

        test("With delete method", () => {
            let copyMockedResponse: AxiosResponse<any, any> = deepCopy(mockedResponse);
            copyMockedResponse.config = {headers: assertedMockHeaders, method: "delete"};
            mockedAxios.default.mockImplementation(() => ({
                response: copyMockedResponse,
                error: EMPTY_STRING,
                loading: false,
                executeHttpRequest: jest.fn()
            }));
            render(
                <Provider store={mockStore}>
                    <ElementDetails/>
                </Provider>
            );

            expect(global.alert).toHaveBeenCalledWith(PRODUCT_DELETED_SUCCESSFULLY);
            expect(global.close).toHaveBeenCalled();
        });

        test("With default method", () => {
            let copyMockedResponse: AxiosResponse<any, any> = deepCopy(mockedResponse);
            copyMockedResponse.config = {headers: assertedMockHeaders, method: "default"};
            mockedAxios.default.mockImplementation(() => ({
                response: copyMockedResponse,
                error: EMPTY_STRING,
                loading: false,
                executeHttpRequest: jest.fn()
            }));
            render(
                <Provider store={mockStore}>
                    <ElementDetails/>
                </Provider>
            );

            expect(global.alert).toHaveBeenCalledWith(UNKNOWN_REQUEST_TYPE);
            expect(reloadMock).toHaveBeenCalled();
        });

        test("Should not perform request when axios results an error but should rise alert and reload page", () => {
            mockedAxios.default.mockImplementation(() => ({
                response: null,
                error: "Error",
                loading: false,
                executeHttpRequest: jest.fn()
            }));
            render(
                <Provider store={mockStore}>
                    <ElementDetails/>
                </Provider>
            );

            expect(global.alert).toHaveBeenCalledWith(`${FAILED_REQUEST} Error`);
            expect(reloadMock).toHaveBeenCalled();
        });
    });

    describe("Verify event handlers", () => {
        test("On delete click", () => {
            render(
                <Provider store={mockStore}>
                    <ElementDetails/>
                </Provider>
            );
            const elementDetailsContainer = screen.getByTestId(ELEMENT_DETAILS_CONTAINER);
            const elementDetailsPropertyList = within(elementDetailsContainer).getByTestId(ELEMENT_DETAILS_PROPERTY_LIST);
            const elementControlsContainer = within(elementDetailsPropertyList).getByTestId(ELEMENT_CONTROLS_CONTAINER);
            const elementControlsContainerDeleteButton = within(elementControlsContainer).getAllByTestId(BUTTON)[0];

            fireEvent.click(elementControlsContainerDeleteButton);
            expect(executeHttpRequestMock).toHaveBeenCalled();
        });

        test("On update click", () => {
            render(
                <Provider store={mockStore}>
                    <ElementDetails/>
                </Provider>
            );
            const elementDetailsContainer = screen.getByTestId(ELEMENT_DETAILS_CONTAINER);
            const elementDetailsPropertyList = within(elementDetailsContainer).getByTestId(ELEMENT_DETAILS_PROPERTY_LIST);
            const elementControlsContainer = within(elementDetailsPropertyList).getByTestId(ELEMENT_CONTROLS_CONTAINER);
            const elementControlsContainerUpdateButton = within(elementControlsContainer).getAllByTestId(BUTTON)[1];

            fireEvent.click(elementControlsContainerUpdateButton);
            const dialog = screen.getByTestId(DIALOG);
            expect(dialog).toBeInTheDocument();
        });

        test("On submit dialog", async () => {
            render(
                <Provider store={mockStore}>
                    <ElementDetails/>
                </Provider>
            );
            const elementDetailsContainer = screen.getByTestId(ELEMENT_DETAILS_CONTAINER);
            const elementDetailsPropertyList = within(elementDetailsContainer).getByTestId(ELEMENT_DETAILS_PROPERTY_LIST);
            const elementControlsContainer = within(elementDetailsPropertyList).getByTestId(ELEMENT_CONTROLS_CONTAINER);
            const elementControlsContainerUpdateButton = within(elementControlsContainer).getAllByTestId(BUTTON)[1];

            // Open dialog
            fireEvent.click(elementControlsContainerUpdateButton);
            const dialog = screen.getByTestId(DIALOG);
            expect(dialog).toBeInTheDocument();

            // Submit dialog
            const dialogActions = within(dialog).getByTestId(DIALOG_ACTIONS);
            const dialogButton = within(dialogActions).getAllByTestId(BUTTON)[1];
            fireEvent.click(dialogButton);
            await delay(500);

            // Assertions
            expect(dialog).not.toBeInTheDocument();
            expect(dialogActions).not.toBeInTheDocument();
            expect(dialogButton).not.toBeInTheDocument();
        });

        test("On close dialog", async () => {
            render(
                <Provider store={mockStore}>
                    <ElementDetails/>
                </Provider>
            );
            const elementDetailsContainer = screen.getByTestId(ELEMENT_DETAILS_CONTAINER);
            const elementDetailsPropertyList = within(elementDetailsContainer).getByTestId(ELEMENT_DETAILS_PROPERTY_LIST);
            const elementControlsContainer = within(elementDetailsPropertyList).getByTestId(ELEMENT_CONTROLS_CONTAINER);
            const elementControlsContainerUpdateButton = within(elementControlsContainer).getAllByTestId(BUTTON)[1];

            // Open dialog
            fireEvent.click(elementControlsContainerUpdateButton);
            const dialog = screen.getByTestId(DIALOG);
            expect(dialog).toBeInTheDocument();

            // Close dialog
            const dialogActions = within(dialog).getByTestId(DIALOG_ACTIONS);
            const dialogButton = within(dialogActions).getAllByTestId(BUTTON)[0];
            fireEvent.click(dialogButton);
            await delay(500);

            // Assertions
            expect(dialog).not.toBeInTheDocument();
            expect(dialogActions).not.toBeInTheDocument();
            expect(dialogButton).not.toBeInTheDocument();
        });
    });
});
