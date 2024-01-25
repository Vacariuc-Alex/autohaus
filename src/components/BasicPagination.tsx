import * as React from 'react';
import {useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type BasicPaginationProps = {
    numberOfPages: number,
    currentPage: (selectedPage: number) => void
}

const BasicPagination: React.FC<BasicPaginationProps> = ({numberOfPages, currentPage}) => {

    const [selectedPage, setSelectedPage] = useState<number>(1);

    const handleCurrentPageChange = (e: any) => { //ToDo: Blocker, need to use normal type
        const textContent = e.target.textContent;
        if(textContent) {
            const selectedPage = parseInt(textContent);
            setSelectedPage(selectedPage);
            currentPage(selectedPage);
        }
    }

    return (
        <Stack spacing={2}>
            <Pagination count={numberOfPages} onChange={handleCurrentPageChange}/>
        </Stack>
    );
}

export default BasicPagination;
