import {cleanup, fireEvent, render, screen, within} from '@testing-library/react';
import PageSelector from "../PageSelector";
import React from "react";

//Globals
const elementsPerPageHandler = jest.fn();
const elementsPerPage = ["10", "20", "50", "100", "200", "500", "1000"];

describe("PageSelector component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render PageSelector component", () => {
        render(<PageSelector onElementsPerPageChangeProp={elementsPerPageHandler}/>);
        const boxComponent = screen.getByTestId("box-component");
        const formControl = screen.getByTestId("form-control");
        const inputLabel = screen.getByTestId("input-label");
        const selectComponent = screen.getByTestId("select-component");

        expect(boxComponent).toBeInTheDocument();
        expect(formControl).toBeInTheDocument();
        expect(inputLabel).toBeInTheDocument();
        expect(inputLabel).toHaveTextContent("Elements per Page");
        expect(selectComponent).toBeInTheDocument();
        expect(selectComponent).toHaveTextContent("10");
    });

    test("Should display elements per page options when label is clicked and select second element with value 20", () => {
        render(<PageSelector onElementsPerPageChangeProp={elementsPerPageHandler}/>);

        const selectComponent = screen.getByTestId("select-component");
        const button = within(selectComponent).getByRole("combobox");
        fireEvent.mouseDown(button);

        const presentation = screen.getByRole("presentation");
        const listbox = within(presentation).getByRole("listbox");
        const menuItems = within(listbox).getAllByTestId("menu-item");
        menuItems.forEach((e) => {
            expect(e).toBeInTheDocument();
            expect(elementsPerPage).toContain(e.textContent);
        });

        fireEvent.click(menuItems[1]);
        expect(elementsPerPageHandler).toHaveBeenCalledWith(20);
    });
});
