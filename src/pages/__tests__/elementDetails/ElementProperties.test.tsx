import {cleanup, render, screen, within} from "@testing-library/react";
import ElementProperties from "src/pages/elementDetails/ElementProperties";
import {stubResponseData} from "src/utils/constants/testConstants";
import {ELEMENT_PROPERTIES_CONTAINER, ICON, TYPOGRAPHY} from "src/utils/constants/dataTestIds";

// Globals
const stubProduct = stubResponseData[0];

describe("ElementProperties component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render ElementProperties component", () => {
        render(<ElementProperties product={stubProduct}/>);
        const elementPropertiesContainer = screen.getByTestId(ELEMENT_PROPERTIES_CONTAINER);
        const typographies = within(elementPropertiesContainer).getAllByTestId(TYPOGRAPHY);
        const icons = within(elementPropertiesContainer).getAllByTestId(ICON);

        expect(elementPropertiesContainer).toBeInTheDocument();
        expect(typographies.length).toEqual(12);
        expect(icons.length).toEqual(6);
    });
});
