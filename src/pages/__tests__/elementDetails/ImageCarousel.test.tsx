import {cleanup, render, screen, within} from "@testing-library/react";
import {stubResponseData} from "src/utils/constants/testConstants";
import ImageCarousel from "src/pages/elementDetails/ImageCarousel";
import {IMG, PAGE} from "src/utils/constants/dataTestIds";

// Globals
const stubProduct = {...stubResponseData[0], images: ["https://example.jpeg"]};

describe("ImageCarousel component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render ImageCarousel component", () => {
        render(<ImageCarousel product={stubProduct}/>);
        // ImageCarouselContainer was not marked with data-testid because it is not supported
        const page = screen.getByTestId(PAGE);
        const img = within(page).getByTestId(IMG);

        expect(page).toBeInTheDocument();
        expect(img).toBeInTheDocument();
    });
});
