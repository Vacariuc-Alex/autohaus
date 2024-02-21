import React, {useState} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

type PageSelectorProps = {
    onElementsPerPageChangeProp: (e: number) => void;
}

const PageSelector: React.FC<PageSelectorProps> = ({onElementsPerPageChangeProp}) => {

    const [elementsPerPage, setElementsPerPage] = useState<number>(10);

    const elementsPerPageRange = [10, 20, 50, 100, 200, 500, 1000];

    const handleSelectChange = (e: SelectChangeEvent) => {
        const elementsPerPage: number = parseInt(e.target.value);
        setElementsPerPage(elementsPerPage);
        onElementsPerPageChangeProp(elementsPerPage);
    }

    return (
        <Box sx={{minWidth: 100, maxWidth: 960, margin: "0 100px"}} data-testid="box-component">
            <FormControl fullWidth data-testid="form-control">
                <InputLabel
                    data-testid="input-label"
                    id="elements-per-page-label"
                    sx={{top: -12}}>Elements per Page</InputLabel>
                <Select
                    data-testid="select-component"
                    labelId="elements-per-page-label"
                    id="products-per-page"
                    value={String(elementsPerPage)}
                    onChange={handleSelectChange}
                >
                    {
                        elementsPerPageRange.map((e, i) => (
                            <MenuItem data-testid="menu-item" value={e} key={i}>{e}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    );
}

export default PageSelector;
