import {cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import AddProduct from "src/components/navbar/AddProduct";
import React from "react";
import {mockedResponse, stubResponseData} from "src/utils/constants/testConstants";
import {BUTTON, DIALOG, DIALOG_ACTIONS, DIALOG_CONTENT, TEXT_FIELD, TEXTBOX} from "src/utils/constants/dataTestIds";
import {deepCopy} from "src/utils/helpers/deepCopy";
import * as useAxios from "src/utils/hooks/useAxios"
import {delay} from "src/utils/helpers/delay";
import {FAILED_REQUEST, FEATURE_BLOCKED, PRODUCT_ADDED_SUCCESSFULLY} from "src/utils/constants/alertMessages";

// Globals
const initialData = stubResponseData;

// Mock useAxios
jest.mock("src/utils/hooks/useAxios");
const mockedAxios = useAxios as jest.Mocked<typeof useAxios>;

// Mock windows functions
global.alert = jest.fn();
const reloadMock = jest.fn();
Object.defineProperty(window, "location", {
    value: {reload: reloadMock}
});

describe("AddProduct component", () => {
    beforeEach(() => {
        mockedAxios.default.mockImplementation(() => ({
            response: mockedResponse,
            error: "",
            loading: false,
            executeHttpRequest: jest.fn()
        }));
    });

    afterEach(() => {
        cleanup();
    });

    describe("Should render AddProduct component", () => {
        test("Should setNextIdAfterLatest when latest id is valid and then open the dialog", () => {
            render(<AddProduct initialData={initialData}/>);
            const button = screen.getByTestId(BUTTON);
            fireEvent.click(button);
            const dialog = screen.getByTestId(DIALOG);

            expect(button).toBeInTheDocument();
            expect(dialog).toBeInTheDocument();
        });

        test("Should just open the dialog when initialData is undefined", () => {
            render(<AddProduct initialData={undefined}/>);
            const button = screen.getByTestId(BUTTON);
            fireEvent.click(button);
            const dialog = screen.getByTestId(DIALOG);

            expect(button).toBeInTheDocument();
            expect(dialog).toBeInTheDocument();
        });

        test("Should alert when latest id is invalid", () => {
            let mockInitialData = deepCopy([initialData[0]]);
            mockInitialData[0].id = "This id will not be parsed to int";
            render(<AddProduct initialData={mockInitialData}/>);
            const button = screen.getByTestId(BUTTON);
            fireEvent.click(button);

            expect(global.alert).toHaveBeenCalledWith(FEATURE_BLOCKED);
        });
    });

    test("Should open and then close the dialog", () => {
        render(<AddProduct initialData={initialData}/>);
        const button = screen.getByTestId(BUTTON);
        fireEvent.click(button);
        const dialog = screen.getByTestId(DIALOG);
        const dialogActions = within(dialog).getByTestId(DIALOG_ACTIONS);
        const dialogButton = within(dialogActions).getAllByTestId(BUTTON)[0];
        fireEvent.click(dialogButton);

        expect(button).toBeInTheDocument();
        expect(dialog).not.toBeInTheDocument();
    });

    test("Should submit the form when user enters valid data and then automatically close", async () => {
        render(<AddProduct initialData={initialData}/>);

        // Open Dialog
        const button = screen.getByTestId(BUTTON);
        fireEvent.click(button);

        //Enter values in the form
        const dialog = screen.getByTestId(DIALOG);
        const dialogContent = within(dialog).getByTestId(DIALOG_CONTENT);
        const textFields = within(dialogContent).getAllByTestId(TEXT_FIELD);
        fireEvent.input(within(textFields[0]).getByRole(TEXTBOX), {target: {value: initialData[0].company}});
        fireEvent.input(within(textFields[1]).getByRole(TEXTBOX), {target: {value: initialData[0].model}});
        fireEvent.input(within(textFields[2]).getByRole(TEXTBOX), {target: {value: initialData[0].year}});
        fireEvent.input(within(textFields[3]).getByRole(TEXTBOX), {target: {value: initialData[0].vin}});
        fireEvent.input(within(textFields[4]).getByRole(TEXTBOX), {target: {value: initialData[0].color}});
        fireEvent.input(within(textFields[5]).getByRole(TEXTBOX), {target: {value: initialData[0].price}});
        expect(within(textFields[0]).getByRole(TEXTBOX)).toHaveValue(initialData[0].company);
        expect(within(textFields[1]).getByRole(TEXTBOX)).toHaveValue(initialData[0].model);
        expect(within(textFields[2]).getByRole(TEXTBOX)).toHaveValue(String(initialData[0].year));
        expect(within(textFields[3]).getByRole(TEXTBOX)).toHaveValue(initialData[0].vin);
        expect(within(textFields[4]).getByRole(TEXTBOX)).toHaveValue(initialData[0].color);
        expect(within(textFields[5]).getByRole(TEXTBOX)).toHaveValue(String(initialData[0].price));

        // Submit dialog
        const dialogActions = within(dialog).getByTestId(DIALOG_ACTIONS);
        const dialogButton = within(dialogActions).getAllByTestId(BUTTON)[1];
        fireEvent.click(dialogButton);
        await delay(500);

        expect(button).toBeInTheDocument();
        expect(dialog).not.toBeInTheDocument();
        expect(dialogActions).not.toBeInTheDocument();
        expect(dialogButton).not.toBeInTheDocument();
    });

    describe("Should alert and reload page", () => {
        test("When axios received error", async () => {
            mockedAxios.default.mockImplementation(() => ({
                response: null,
                error: "Error",
                loading: false,
                executeHttpRequest: jest.fn()
            }));
            render(<AddProduct initialData={initialData}/>);

            expect(global.alert).toHaveBeenCalledWith(`${FAILED_REQUEST} Error`);
            expect(reloadMock).toHaveBeenCalled();
        });

        test("When axios received response", async () => {
            //Mocked response is already set in beforeEach
            render(<AddProduct initialData={initialData}/>);

            expect(global.alert).toHaveBeenCalledWith(PRODUCT_ADDED_SUCCESSFULLY);
            expect(reloadMock).toHaveBeenCalled();
        });
    });
});
