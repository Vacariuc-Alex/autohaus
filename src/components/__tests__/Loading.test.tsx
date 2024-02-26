import {cleanup, render, screen} from "@testing-library/react";
import Loading from "src/components/Loading";
import {BOX, CIRCULAR_PROGRESS, TYPOGRAPHY} from "src/utils/constants/dataTestIds";

describe("Loading component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render Loading component", () => {
        render(<Loading/>);
        const box = screen.getByTestId(BOX);
        const circularProgress = screen.getByTestId(CIRCULAR_PROGRESS);
        const typography = screen.getByTestId(TYPOGRAPHY);

        expect(box).toBeInTheDocument();
        expect(circularProgress).toBeInTheDocument();
        expect(typography).toBeInTheDocument();
        expect(typography).toHaveTextContent("Loading ...");
    });
});
