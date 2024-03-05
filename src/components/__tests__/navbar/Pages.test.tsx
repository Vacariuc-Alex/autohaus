import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import {BUTTON} from "src/utils/constants/dataTestIds";
import React from "react";
import Pages from "src/components/navbar/Pages";

// Test data
const buttonValues: [number, string][] = [[0, "Home"], [1, "News"], [2, "Wishlist"]];
const buttonLinks: [number, string][] = [[0, "/home"], [1, "/news"], [2, "/wishlist"]];

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate
}));

describe("Pages component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render Pages component", () => {
        render(<Pages/>);
        const buttons = screen.getAllByTestId(BUTTON);
        expect(buttons.length).toBe(3);
    });

    test.each(buttonLinks)("Should navigate to correct page when a button is clicked", (index, link) => {
        render(<Pages/>);
        const buttons = screen.getAllByTestId(BUTTON);
        fireEvent.click(buttons[index]);
        expect(mockedNavigate).toHaveBeenCalledWith(link);
    });

    test.each(buttonValues)("Should render buttons with correct value", (index, text) => {
        render(<Pages/>);
        const buttons = screen.getAllByTestId(BUTTON);
        expect(buttons[index]).toHaveTextContent(text);
    });
});
