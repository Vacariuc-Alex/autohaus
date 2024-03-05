import {cleanup, fireEvent, render, screen, within} from "@testing-library/react";
import {
    BUTTON,
    DIALOG,
    DIALOG_ACTIONS,
    DIALOG_CONTENT,
    DIALOG_CONTENT_TEXT,
    DIALOG_TITLE,
    TEXT_FIELD,
    TEXTBOX
} from "src/utils/constants/dataTestIds";
import React from "react";
import FormDialog from "src/components/navbar/FormDialog";
import {stubResponseData} from "src/utils/constants/testConstants";
import {productSchema} from "src/utils/helpers/schemes";

// Globals
const editedProduct = [
    "VAZ",
    "2109",
    "2003",
    "JTDZN3EU4E3035525",
    "Blue",
    "1000",
    "https://example.edited.jpeg"
];

// Props
const action = "EDIT";
const stubProductWithNoImages = stubResponseData[0];
const stubProductWithTwoImages = {
    ...stubResponseData[0],
    images: [
        "https://example.original.1.jpeg",
        "https://example.original.2.jpeg",
    ]
};
const closeDialog = jest.fn();
const formSubmission = jest.fn();

describe("FormDialog component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render FormDialog component with product containing 2 images and close the form", () => {
        render(
            <FormDialog
                action={action}
                product={stubProductWithTwoImages}
                closeDialog={closeDialog}
                formSubmission={formSubmission}/>
        );
        const dialog = screen.getByTestId(DIALOG);
        const dialogTitle = within(dialog).getByTestId(DIALOG_TITLE);
        const dialogContent = within(dialog).getByTestId(DIALOG_CONTENT);
        const dialogContentText = within(dialogContent).getByTestId(DIALOG_CONTENT_TEXT);
        const textFields = within(dialogContent).getAllByTestId(TEXT_FIELD);
        const dialogContentButton = within(dialogContent).getByTestId(BUTTON);
        const dialogActions = within(dialog).getByTestId(DIALOG_ACTIONS);
        const dialogActionsButtons = within(dialogActions).getAllByTestId(BUTTON);

        expect(dialog).toBeInTheDocument();
        expect(dialogTitle).toBeInTheDocument();
        expect(dialogContent).toBeInTheDocument();
        expect(dialogContentText).toBeInTheDocument();
        expect(textFields.length).toBe(8);
        expect(within(textFields[0]).getByRole(TEXTBOX)).toHaveValue(stubProductWithTwoImages.company);
        expect(within(textFields[1]).getByRole(TEXTBOX)).toHaveValue(stubProductWithTwoImages.model);
        expect(within(textFields[2]).getByRole(TEXTBOX)).toHaveValue(String(stubProductWithTwoImages.year));
        expect(within(textFields[3]).getByRole(TEXTBOX)).toHaveValue(stubProductWithTwoImages.vin);
        expect(within(textFields[4]).getByRole(TEXTBOX)).toHaveValue(stubProductWithTwoImages.color);
        expect(within(textFields[5]).getByRole(TEXTBOX)).toHaveValue(String(stubProductWithTwoImages.price));

        // Product is stubbed with 2 images
        expect(within(textFields[6]).getByRole(TEXTBOX)).toHaveValue(stubProductWithTwoImages.images[0]);
        expect(within(textFields[7]).getByRole(TEXTBOX)).toHaveValue(stubProductWithTwoImages.images[1]);

        expect(dialogContentButton).toBeInTheDocument();
        expect(dialogActions).toBeInTheDocument();
        expect(dialogActionsButtons.length).toBe(2);

        fireEvent.click(dialogActionsButtons[0]); // closes the form
    });

    test("Should change the textbox values when user performs an input " +
        "and clicks on more button to add additional pictures and submit the form", () => {
        render(
            <FormDialog
                action={action}
                product={stubProductWithNoImages}
                closeDialog={closeDialog}
                formSubmission={formSubmission}/>
        );
        const dialog = screen.getByTestId(DIALOG);
        const dialogContent = within(dialog).getByTestId(DIALOG_CONTENT);
        let textFields = within(dialogContent).getAllByTestId(TEXT_FIELD);
        const dialogContentButton = within(dialogContent).getByTestId(BUTTON);
        const dialogActions = within(dialog).getByTestId(DIALOG_ACTIONS);
        const dialogActionsButtons = within(dialogActions).getAllByTestId(BUTTON);

        // user performs inputs
        for (let i = 0; i < 7; i++) {
            fireEvent.input(within(textFields[i]).getByRole(TEXTBOX), {target: {value: editedProduct[i]}});
            expect(within(textFields[i]).getByRole(TEXTBOX)).toHaveValue(editedProduct[i]);
        }

        // clicking on more button to add additional pictures
        for (let i = 7; i < 16; i++) {
            fireEvent.click(dialogContentButton);
            textFields = within(dialogContent).getAllByTestId(TEXT_FIELD);
            expect(textFields.length).toBe(i + 1);

            // adding the same images, doesn't impact test result if images are the same or different
            fireEvent.input(within(textFields[i]).getByRole(TEXTBOX), {target: {value: editedProduct[6]}});
            expect(within(textFields[i]).getByRole(TEXTBOX)).toHaveValue(editedProduct[6]);
        }

        fireEvent.click(dialogContentButton); // clicks the last time more button
        fireEvent.click(dialogActionsButtons[1]); // submits the form
    });

    test("Should immediately change the input price to correct format when user enters incorrect price format", () => {
        const incorrectPriceFormat = "999.99.999";
        const correctedPriceFormat = "999.99";

        render(
            <FormDialog
                action={action}
                product={stubProductWithNoImages}
                closeDialog={closeDialog}
                formSubmission={formSubmission}/>
        );
        const dialog = screen.getByTestId(DIALOG);
        const dialogContent = within(dialog).getByTestId(DIALOG_CONTENT);
        const textFields = within(dialogContent).getAllByTestId(TEXT_FIELD);

        // user enters incorrect price format
        fireEvent.input(within(textFields[5]).getByRole(TEXTBOX), {target: {value: incorrectPriceFormat}});
        expect(within(textFields[5]).getByRole(TEXTBOX)).toHaveValue(correctedPriceFormat);
    });

    test("Should validate form and rise alert when user enters invalid data for year property", async () => {
        jest.spyOn(productSchema, 'validate').mockRejectedValue(new Error("Validation error"));
        global.alert = jest.fn();

        render(
            <FormDialog
                action={action}
                product={stubProductWithNoImages}
                closeDialog={closeDialog}
                formSubmission={formSubmission}/>
        );
        const dialog = screen.getByTestId(DIALOG);
        const dialogContent = within(dialog).getByTestId(DIALOG_CONTENT);
        const textFields = within(dialogContent).getAllByTestId(TEXT_FIELD);
        const dialogActions = within(dialog).getByTestId(DIALOG_ACTIONS);
        const dialogActionsButtons = within(dialogActions).getAllByTestId(BUTTON);

        // user enters invalid year
        fireEvent.input(within(textFields[1]).getByRole(TEXTBOX), {target: {value: "1"}});
        fireEvent.click(dialogActionsButtons[1]);
        expect(formSubmission).not.toHaveBeenCalled();
    });
});
