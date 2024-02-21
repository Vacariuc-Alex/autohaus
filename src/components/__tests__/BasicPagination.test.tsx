import React from 'react';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import BasicPagination from '../BasicPagination';

//Globals
const numberOfPages: number = 10;
const handleCurrentPage = jest.fn();

//Test data
const paginationItemsData = [[1, 1], [5, 5], [6, 10]];

describe("BasicPagination component", () => {
    afterEach(() => {
        cleanup();
    });

    test("Should render BasicPagination correctly with required amount of elements", () => {
        render(<BasicPagination numberOfPagesProp={numberOfPages} currentPageProp={handleCurrentPage}/>);
        const paginationStack = screen.getByTestId("pagination-stack");
        const paginationComponent = screen.getByTestId("pagination-component");
        const paginationItems = screen.getAllByTestId("pagination-item");
        // <- 1 2 3 4 5 [...] 10 ->
        const numberOfPaginationItems = numberOfPages - 2;

        expect(paginationStack).toBeInTheDocument();
        expect(paginationComponent).toBeInTheDocument();
        expect(paginationItems.length).toBe(numberOfPaginationItems);
    });

    test.each(paginationItemsData)("Should select an element which represents page number when it is clicked", (
        index, param) => {
        render(<BasicPagination numberOfPagesProp={numberOfPages} currentPageProp={handleCurrentPage}/>);
        const paginationItems = screen.getAllByTestId("pagination-item");

        fireEvent.click(paginationItems[index]);
        expect(handleCurrentPage).toHaveBeenCalledWith(param);
    });

    test("Should select next page element when forward arrow is clicked " +
        "and then previous page element when back arrow is clicked", () => {
        render(<BasicPagination numberOfPagesProp={numberOfPages} currentPageProp={handleCurrentPage}/>);

        const arrowForwardIcon = screen.getByTestId("arrow-forward-icon");
        fireEvent.click(arrowForwardIcon);
        expect(handleCurrentPage).toHaveBeenCalledWith(2);

        const arrowBackIcon = screen.getByTestId("arrow-back-icon");
        fireEvent.click(arrowBackIcon);
        expect(handleCurrentPage).toHaveBeenCalledWith(1);
    });

    test("Should not select next or previous pages if numberOfPages is smaller than the currentPage", () => {
        render(<BasicPagination numberOfPagesProp={1} currentPageProp={handleCurrentPage}/>);

        const arrowForwardIcon = screen.getByTestId("arrow-forward-icon");
        fireEvent.click(arrowForwardIcon);
        expect(handleCurrentPage).not.toHaveBeenCalled();

        const arrowBackIcon = screen.getByTestId("arrow-back-icon");
        fireEvent.click(arrowBackIcon);
        expect(handleCurrentPage).not.toHaveBeenCalled();
    });
});
