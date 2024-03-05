import {cleanup, render, screen, within} from "@testing-library/react";
import ElementProperties from "src/pages/elementDetails/ElementProperties";
import {ELEMENT_PROPERTIES_CONTAINER, ICON, TYPOGRAPHY} from "src/utils/constants/dataTestIds";
import {stubProductOne} from "src/utils/constants/testConstants";

describe("ElementProperties component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render ElementProperties component", () => {
        render(<ElementProperties product={stubProductOne}/>);
        const elementPropertiesContainer = screen.getByTestId(ELEMENT_PROPERTIES_CONTAINER);
        const typographies = within(elementPropertiesContainer).getAllByTestId(TYPOGRAPHY);
        const icons = within(elementPropertiesContainer).getAllByTestId(ICON);

        expect(elementPropertiesContainer).toBeInTheDocument();
        expect(typographies.length).toEqual(12);
        expect(icons.length).toEqual(6);
    });
});
