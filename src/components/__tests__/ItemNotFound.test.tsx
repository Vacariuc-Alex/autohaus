import {render, screen, within} from "@testing-library/react";
import ItemNotFound from "../ItemNotFound";

describe("ItemNotFound component", () => {
    test("Should render ItemNotFound component", () => {
        render(<ItemNotFound/>);
        const noItemContainer = screen.getByTestId("no-item-container");
        const image = within(noItemContainer).getByTestId("image");
        const typography = within(noItemContainer).getByTestId("typography");

        expect(noItemContainer).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("alt", "Item not found");
        expect(typography).toBeInTheDocument();
        expect(typography).toHaveTextContent("This item currently doesn't exist in our stock!");
    });
});
