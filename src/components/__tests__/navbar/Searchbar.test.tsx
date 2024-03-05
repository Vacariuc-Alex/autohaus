import {cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import {stubProductResponseData} from "src/utils/constants/testConstants";
import {SEARCH, STYLED_INPUT_BASE, TEXTBOX} from "src//utils/constants/dataTestIds";
import React from "react";
import Searchbar from "src/components/navbar/Searchbar";

//Globals
const resultingData = jest.fn();

describe("Searchbar component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render Searchbar component", () => {
        render(<Searchbar initialData={stubProductResponseData} resultingData={resultingData}/>);
        const search = screen.getByTestId(SEARCH);
        const styledInputBase = within(search).getByTestId(STYLED_INPUT_BASE);
        const inputBox = within(styledInputBase).getByRole(TEXTBOX);

        expect(search).toBeInTheDocument();
        expect(styledInputBase).toBeInTheDocument();
        expect(inputBox).toBeInTheDocument();
    });

    test("Should search items by given input text", () => {
        render(<Searchbar initialData={stubProductResponseData} resultingData={resultingData}/>);
        const search = screen.getByTestId(SEARCH);
        const styledInputBase = within(search).getByTestId(STYLED_INPUT_BASE);
        const inputBox = within(styledInputBase).getByRole(TEXTBOX);

        fireEvent.click(styledInputBase);
        fireEvent.change(inputBox, {
            target: {value: "UAZ"}
        });
    });
});
