import React, {useState} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

type PageSelectorProps = {
    onElementsPerPageChange: (elementsPerPage: number) => void;
}

const PageSelector: React.FC<PageSelectorProps> = ({onElementsPerPageChange}) => {

    const [elementsPerPage, setElementsPerPage] = useState<number>(10);

    const handleSelectChange = (e: SelectChangeEvent) => {
        console.log(typeof e)
        const elementsPerPage: number = parseInt(e.target.value);
        setElementsPerPage(elementsPerPage);
        onElementsPerPageChange(elementsPerPage);
    }

    return(
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="elements-per-page-label">Elements per Page</InputLabel>
                <Select
                    labelId="elements-per-page-label"
                    id="products-per-page"
                    value={String(elementsPerPage)}
                    onChange={handleSelectChange}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={500}>500</MenuItem>
                    <MenuItem value={1000}>1000</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default PageSelector;
