import {cleanup, render, screen} from "@testing-library/react";
import Loading from "../Loading";

describe("Loading component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render Loading component", () => {
        render(<Loading/>);
        const box = screen.getByTestId("box");
        const circularProgress = screen.getByTestId("circular-progress");
        const typography = screen.getByTestId("typography");

        expect(box).toBeInTheDocument();
        expect(circularProgress).toBeInTheDocument();
        expect(typography).toBeInTheDocument();
        expect(typography).toHaveTextContent("Loading ...");
    });
});
