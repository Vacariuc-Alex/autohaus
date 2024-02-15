import {cleanup, render, screen, within} from "@testing-library/react";
import renderer from "react-test-renderer";
import PageNotFound from "../PageNotFound";
import React from "react";

//Globals
const notFoundContainerMessages: {index: number, value: string}[] = [
    {index: 0, value: "404"},
    {index: 1, value: "Page Not Found!"},
    {index: 2, value: "Sorry, the page you're looking for does not exist!"}
];

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("PageNotFound component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render PageNotFound component", () => {
        render(<PageNotFound/>);
        const navbar = screen.getByTestId("app-bar");
        const notFoundContainer = screen.getByTestId("not-found-container");
        const typographies = within(notFoundContainer).getAllByTestId("typography");
        const image = within(notFoundContainer).getByRole("img");

        expect(navbar).toBeInTheDocument();
        expect(notFoundContainer).toBeInTheDocument();
        expect(typographies.length).toBe(3);
        expect(image).toBeInTheDocument();

        typographies.forEach((e, i) => {
            expect(e).toHaveTextContent(notFoundContainerMessages[i].value);
        });
    });

    test("Should match snapshot", () => {
        const structure = renderer
            .create(<PageNotFound/>)
            .toJSON();
        expect(structure).toMatchSnapshot();
    });
});
