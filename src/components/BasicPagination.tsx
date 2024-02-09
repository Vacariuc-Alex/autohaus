import React, {BaseSyntheticEvent, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type BasicPaginationProps = {
    numberOfPagesProp: number,
    currentPageProp: (e: number) => void
}

const BasicPagination: React.FC<BasicPaginationProps> = ({numberOfPagesProp, currentPageProp}) => {

    const [selectedPage, setSelectedPage] = useState<number>(1);

    const handleCurrentPageChange = (e: BaseSyntheticEvent) => {
        const textContent = e.target.textContent;
        if (textContent) {
            const selectedPage = parseInt(textContent);
            setSelectedPage(selectedPage);
            currentPageProp(selectedPage);
        }
    }

    const goToNextPage = () => {
        if (selectedPage < numberOfPagesProp) {
            setSelectedPage(selectedPage + 1);
            currentPageProp(selectedPage + 1);
        }
    }

    const goToPreviousPage = () => {
        if (selectedPage > 1) {
            setSelectedPage(selectedPage - 1);
            currentPageProp(selectedPage - 1);
        }
    }

    const ArrowBack = () => {
        return (
            <ArrowBackIcon onClick={goToPreviousPage}/>
        );
    }

    const ArrowForward = () => {
        return (
            <ArrowForwardIcon onClick={goToNextPage}/>
        );
    }

    return (
        <Stack sx={{margin: "20px 100px"}}>
            <Pagination
                onChange={handleCurrentPageChange}
                count={Math.ceil(numberOfPagesProp)}
                renderItem={(item) => (
                    <PaginationItem
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
