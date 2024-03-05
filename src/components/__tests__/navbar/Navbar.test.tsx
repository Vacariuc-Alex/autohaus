import React from "react";
import Navbar from "src/components/navbar/Navbar";
import {cleanup, render, screen, within} from "@testing-library/react";
import {stubResponseData} from "src/utils/constants/testConstants";
import {
    APP_BAR,
    BOX,
    BUTTON,
    CONTAINER,
    FA_CAR_ICON,
    SEARCH,
    SEARCH_ICON,
    SEARCH_ICON_WRAPPER,
    STYLED_INPUT_BASE,
    TEXTBOX,
    TOOLBAR,
    TYPOGRAPHY
} from "src/utils/constants/dataTestIds";

//Globals
const resultingData = jest.fn();

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate
}));

describe("Navbar component", () => {
    afterEach(() => {
        cleanup();
    });

    describe("Should render Navbar component", () => {
        test("Navbar component with no properties", () => {
            render(<Navbar initialData={stubResponseData} resultingData={resultingData}/>);
            const appBar = screen.getByTestId(APP_BAR);
            const container = within(appBar).getByTestId(CONTAINER);
            const toolbar = within(container).getByTestId(TOOLBAR);
            const faCarIcon = within(toolbar).getByTestId(FA_CAR_ICON);
            const typography = within(toolbar).getByTestId(TYPOGRAPHY);
            const box = within(toolbar).getByTestId(BOX);
            const buttons = within(box).getAllByTestId(BUTTON);

            expect(appBar).toBeInTheDocument();
            expect(container).toBeInTheDocument();
            expect(toolbar).toBeInTheDocument();
            expect(faCarIcon).toBeInTheDocument();
            expect(faCarIcon).toHaveStyle("display: flex; margin-right: 30px; transform: scale(1.5)");
            expect(typography).toBeInTheDocument();
            expect(typography).toHaveTextContent("Autohaus");
            expect(box).toBeInTheDocument();
            expect(buttons.length).toBe(4);
        });

        test("Navbar component with properties", () => {
            render(<Navbar initialData={stubResponseData} resultingData={resultingData}/>);
            const appBar = screen.getByTestId(APP_BAR);
            const container = within(appBar).getByTestId(CONTAINER);
            const toolbar = within(container).getByTestId(TOOLBAR);
            const search = within(toolbar).getByTestId(SEARCH);
            const searchIconWrapper = within(search).getByTestId(SEARCH_ICON_WRAPPER);
            const searchIcon = within(searchIconWrapper).getByTestId(SEARCH_ICON);
            const styledInputBase = within(search).getByTestId(STYLED_INPUT_BASE);
            const inputBox = within(styledInputBase).getByRole(TEXTBOX);

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
});
