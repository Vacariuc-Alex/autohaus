import React, {BaseSyntheticEvent} from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {PaginationItem} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useDispatch, useSelector} from "react-redux";
import {resetCurrentPage, setCurrentPage} from "src/utils/redux/userSelectionReducer";
import {RootState} from "src/utils/redux/store";
import {
    ARROW_BACK_ICON,
    ARROW_FORWARD_ICON,
    PAGINATION_COMPONENT,
    PAGINATION_ITEM,
    PAGINATION_STACK
} from "src/utils/constants/dataTestIds";

const BasicPagination = () => {

    // Redux hooks
    const dispatch = useDispatch();
    const userSelectionStoreSelector = useSelector((state: RootState) => state.userSelectionStore);

    // Simplified redux variables
    const currentPage = userSelectionStoreSelector.currentPage;
    const numberOfPages = userSelectionStoreSelector.numberOfPages;

    // Handle when user clicks on a pagination button then display the selected page
    const handleCurrentPageChange = (e: BaseSyntheticEvent) => {
        const textContent = e.target.textContent;
        if (textContent) {
            const selectedPage = parseInt(textContent);
            dispatch(setCurrentPage(selectedPage));
        }
    }

    // Pagination arrow navigators to allow going to next or previous page
    const goToNextPage = () => {
        if (currentPage < numberOfPages) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    }

    //Validator to prevent pagination overflow
    const checkAndUpdateCurrentPage = () => {
        if (currentPage > numberOfPages) {
            dispatch(resetCurrentPage());
        }
        return currentPage;
    }

    // Arrow renderers
    const ArrowBack = () => {
        return (
            <ArrowBackIcon onClick={goToPreviousPage} data-testid={ARROW_BACK_ICON}/>
        );
    }

    const ArrowForward = () => {
        return (
            <ArrowForwardIcon onClick={goToNextPage} data-testid={ARROW_FORWARD_ICON}/>
        );
    }

    // Render
    return (
        <Stack data-testid={PAGINATION_STACK} sx={{margin: "16px calc((80vw - 40vw) / 2)"}}>
            <Pagination
                data-testid={PAGINATION_COMPONENT}
                onChange={handleCurrentPageChange}
                count={Math.ceil(numberOfPages)}
                page={checkAndUpdateCurrentPage()}
                renderItem={(item) => (
                    <PaginationItem
                        data-testid={PAGINATION_ITEM}
                        slots={{
                            previous: ArrowBack,
                            next: ArrowForward
                        }}
                        {...item}
                    />
                )}
            />
        </Stack>
    );
}

export default BasicPagination;
