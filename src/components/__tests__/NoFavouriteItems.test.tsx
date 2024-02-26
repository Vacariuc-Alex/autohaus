import {cleanup, render, screen} from "@testing-library/react";
import React from "react";
import NoFavouriteItems from "src/components/NoFavouriteItems";
import {
    IMG_CONTAINER,
    NO_ITEMS_CONTAINER,
    TYPOGRAPHY_HEADING_CONTAINER,
    TYPOGRAPHY_PARAGRAPH_CONTAINER
} from "src/utils/constants/dataTestIds";

describe("NoItems component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render NoFavouriteItems component", () => {
        render(<NoFavouriteItems/>);
        const noItemContainer = screen.getByTestId(NO_ITEMS_CONTAINER);
        const imgContainer = screen.getByTestId(IMG_CONTAINER);
        const typographyHeadingContainer = screen.getByTestId(TYPOGRAPHY_HEADING_CONTAINER);
        const typographyParagraphContainer = screen.getByTestId(TYPOGRAPHY_PARAGRAPH_CONTAINER);

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
