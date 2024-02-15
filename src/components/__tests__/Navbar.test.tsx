import React from 'react';
import Navbar from "../Navbar";
import {cleanup, fireEvent, render, screen} from "@testing-library/react";

// Test data
const buttonValues: [number, string][] = [[0, "Home"], [1, "News"], [2, "Wishlist"]];
const buttonLinks: [number, string][] = [[0, "/home"], [1, "/news"], [2, "/wishlist"]];

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

    test("Should render Navbar component", () => {
        render(<Navbar/>);
        const appBar = screen.getByTestId("app-bar");
        const container = screen.getByTestId("container");
        const toolbar = screen.getByTestId("toolbar");
        const faCarIcon = screen.getByTestId("fa-car-icon");
        const typography = screen.getByTestId("typography");
        const box = screen.getByTestId("box");
        const buttons = screen.getAllByTestId("button");

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
});
