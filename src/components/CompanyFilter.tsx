import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React, {BaseSyntheticEvent} from "react";
import RightPanel from "../utils/styledComponents/RightPanel";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../utils/redux/store";
import {createSelector} from "@reduxjs/toolkit";
import {Product} from "../utils/constants/constants";
import {addNewCompany, removeExistingCompany} from "../utils/redux/userSelectionReducer";

const CompanyFilter = () => {

    // Redux hooks
    const dispatch = useDispatch();
    const selectedCompaniesSelector = (state: RootState) => state.userSelectionStore.selectedCompanies;
    const responseDataSelector = (state: RootState) => state.productsStore.responseData;
    const selectorCombiner = (selectedCompaniesSelector: string[], responseDataSelector: Product[]) => {
        return {
            selectedCompaniesSelector: selectedCompaniesSelector,
            responseDataSelector: Array.from(
                new Set(
                    responseDataSelector.map((e) => {
                        return e.company;
                    })
                )
            ).sort(),
        };
    };
    const combinedSelector = createSelector(selectedCompaniesSelector, responseDataSelector, selectorCombiner);
    const selector = useSelector(combinedSelector);

    //Redux Simplified variable names
    const companies = selector.selectedCompaniesSelector;
    const responseData = selector.responseDataSelector;

    // Handlers
    const handleCompanyChange = (e: BaseSyntheticEvent) => {
        const state: boolean = e.target.checked;
        const value: string = e.target.value;

        if (state) {
            dispatch(addNewCompany(value));
        } else {
            dispatch(removeExistingCompany(value));
        }
    }

    // Styles
    const formGroupStyle = {
        border: "solid 1px #000",
        borderRadius: "5px",
        margin: "100px 20px",
        padding: "20px 100px 20px 30px",

    };

    return (
        <RightPanel data-testid="right-panel">
            <FormGroup data-testid="form-group" sx={formGroupStyle}>
                {
                    responseData.map((e: string, i: number) => (
                        <FormControlLabel
                            data-testid="form-control-label"
                            control={<Checkbox data-testid="checkbox"/>}
                            sx={{width: "200px"}}
                            onChange={handleCompanyChange}
                            checked={companies.includes(e)}
                            value={e}
                            label={e}
                            key={i}
                        />
                    ))
                }
            </FormGroup>
        </RightPanel>
    );
}

export default CompanyFilter;
