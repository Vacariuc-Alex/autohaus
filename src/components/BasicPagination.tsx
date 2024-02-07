import React, {BaseSyntheticEvent, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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

    return (
        <Stack sx={{margin: "20px 100px"}}>
            <Pagination count={Math.ceil(numberOfPagesProp)} onChange={handleCurrentPageChange}/>
        </Stack>
    );
}

export default BasicPagination;
