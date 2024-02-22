import React from 'react';
import Navbar from "../Navbar";
import {cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import {stubResponseData} from "../../utils/constants/testConstants";

// Test data
const buttonValues: [number, string][] = [[0, "Home"], [1, "News"], [2, "Wishlist"]];
const buttonLinks: [number, string][] = [[0, "/home"], [1, "/news"], [2, "/wishlist"]];

//Globals
const resultingData = jest.fn();

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("Navbar component", () => {
    afterEach(() => {
        cleanup();
    });

    describe("Should render Navbar component", () => {
        test("Navbar component with no properties", () => {
            render(<Navbar initialData={stubResponseData} resultingData={resultingData}/>);
            const appBar = screen.getByTestId("app-bar");
            const container = within(appBar).getByTestId("container");
            const toolbar = within(container).getByTestId("toolbar");
            const faCarIcon = within(toolbar).getByTestId("fa-car-icon");
            const typography = within(toolbar).getByTestId("typography");
            const box = within(toolbar).getByTestId("box");
            const buttons = within(box).getAllByTestId("button");

            expect(appBar).toBeInTheDocument();
            expect(container).toBeInTheDocument();
            expect(toolbar).toBeInTheDocument();
            expect(faCarIcon).toBeInTheDocument();
            expect(faCarIcon).toHaveStyle("display: flex; margin-right: 30px; transform: scale(1.5)");
            expect(typography).toBeInTheDocument();
            expect(typography).toHaveTextContent("Autohaus");
            expect(box).toBeInTheDocument();
            expect(buttons.length).toBe(3);
        });

        test("Navbar component with properties", () => {
            render(<Navbar initialData={stubResponseData} resultingData={resultingData}/>);
            const appBar = screen.getByTestId("app-bar");
            const container = within(appBar).getByTestId("container");
            const toolbar = within(container).getByTestId("toolbar");
            const search = within(toolbar).getByTestId("search");
            const searchIconWrapper = within(search).getByTestId("search-icon-wrapper");
            const searchIcon = within(searchIconWrapper).getByTestId("search-icon");
            const styledInputBase = within(search).getByTestId("styled-input-base");
            const inputBox = within(styledInputBase).getByRole("textbox");

            expect(appBar).toBeInTheDocument();
            expect(container).toBeInTheDocument();
            expect(toolbar).toBeInTheDocument();
            expect(search).toBeInTheDocument();
            expect(searchIconWrapper).toBeInTheDocument();
            expect(searchIcon).toBeInTheDocument();
            expect(styledInputBase).toBeInTheDocument();
            expect(inputBox).toBeInTheDocument();
            expect(inputBox.getAttribute("placeholder")).toEqual("Search…");
        });
    });

    test.each(buttonValues)("Should render buttons with correct value", (index, text) => {
        render(<Navbar/>);
        const buttons = screen.getAllByTestId("button");
        expect(buttons[index]).toHaveTextContent(text);
    });

    test.each(buttonLinks)("Should navigate to correct page when a button is clicked", (index, link) => {
        render(<Navbar/>);
        const buttons = screen.getAllByTestId("button");
        fireEvent.click(buttons[index]);
        expect(mockedNavigate).toHaveBeenCalledWith(link);
    });

    test("Should search items by given input text", () => {
        render(<Navbar initialData={stubResponseData} resultingData={resultingData}/>);
        const appBar = screen.getByTestId("app-bar");
        const container = within(appBar).getByTestId("container");
        const toolbar = within(container).getByTestId("toolbar");
        const search = within(toolbar).getByTestId("search");
        const styledInputBase = within(search).getByTestId("styled-input-base");
        const inputBox = within(styledInputBase).getByRole("textbox");

        fireEvent.click(styledInputBase);
        fireEvent.change(inputBox, {
            target: { value: "UAZ" }
        });
    });
});
