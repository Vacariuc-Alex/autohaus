import {render, screen, within} from "@testing-library/react";
import ItemNotFound from "src/components/ItemNotFound";
import {IMAGE, NO_ITEMS_CONTAINER, TYPOGRAPHY} from "src/utils/constants/dataTestIds";

describe("ItemNotFound component", () => {
    test("Should render ItemNotFound component", () => {
        render(<ItemNotFound/>);
        const noItemContainer = screen.getByTestId(NO_ITEMS_CONTAINER);
        const image = within(noItemContainer).getByTestId(IMAGE);
        const typography = within(noItemContainer).getByTestId(TYPOGRAPHY);

        expect(noItemContainer).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("alt", "Item not found");
        expect(typography).toBeInTheDocument();
        expect(typography).toHaveTextContent("This item currently doesn't exist in our stock!");
    });
});
