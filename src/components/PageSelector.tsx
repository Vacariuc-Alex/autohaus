import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {resetCurrentPage, setElementsPerPage} from "../utils/redux/userSelectionReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../utils/redux/store";

const PageSelector = () => {

    const dispatch = useDispatch();
    const elementsPerPage = useSelector((state: RootState) => state.userSelectionStore.elementsPerPage);

    const elementsPerPageRange = [10, 20, 50, 100, 200, 500, 1000];

    const handleSelectChange = (e: SelectChangeEvent) => {
        const elementsPerPage: number = parseInt(e.target.value);
        dispatch(resetCurrentPage());
        dispatch(setElementsPerPage(elementsPerPage));
    }

    return (
        <Box data-testid="box-component" sx={{width: "40vw", margin: "0 calc((80vw - 40vw) / 2)"}}>
            <FormControl fullWidth data-testid="form-control">
                <InputLabel
                    data-testid="input-label"
                    id="elements-per-page-label"
                    sx={{top: -12}}
                >
                    Elements per Page
                </InputLabel>
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
