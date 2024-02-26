import {cleanup, render, screen, within} from "@testing-library/react";
import ElementControls from "src/pages/elementDetails/ElementControls";
import {BUTTON, ELEMENT_CONTROLS_CONTAINER} from "src/utils/constants/dataTestIds";

// Mocks
const onDeleteHandler = jest.fn();
const onUpdateHandler = jest.fn();

describe("ElementControls component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render ElementControls component", () => {
        render(<ElementControls handleOnDeleteClick={onDeleteHandler} handleOnUpdateClick={onUpdateHandler}/>);
        const elementControlsContainer = screen.getByTestId(ELEMENT_CONTROLS_CONTAINER);
        const buttons = within(elementControlsContainer).getAllByTestId(BUTTON);

        expect(elementControlsContainer).toBeInTheDocument();
        expect(buttons.length).toEqual(2);
    });
});
