import {cleanup, render, screen} from "@testing-library/react";
import NoItems from "../NoItems";
import React from "react";

describe("NoItems component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render NoItems component", () => {
        render(<NoItems/>);
        const noItemContainer = screen.getByTestId("no-item-container");
        const imgContainer = screen.getByTestId("img-container");
        const typographyHeadingContainer = screen.getByTestId("typography-heading-container");
        const typographyParagraphContainer = screen.getByTestId("typography-paragraph-container");

        expect(noItemContainer).toBeInTheDocument();

        expect(imgContainer).toBeInTheDocument();
        expect(imgContainer.tagName).toBe("IMG");

        expect(typographyHeadingContainer).toBeInTheDocument();
        expect(typographyHeadingContainer.tagName).toBe("H3");
        expect(typographyHeadingContainer).toHaveTextContent("You don't have any favourite items!");

        expect(typographyParagraphContainer).toBeInTheDocument();
        expect(typographyHeadingContainer.tagName).toBe("H3");
        expect(typographyParagraphContainer).toHaveTextContent("You can add an item to favourite by clicking on the heart that shows up when you hover over the picture!");
    });
});
