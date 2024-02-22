import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React, {BaseSyntheticEvent} from "react";
import RightPanel from "src/utils/styledComponents/RightPanel";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/utils/redux/store";
import {createSelector} from "@reduxjs/toolkit";
import {Product} from "src/utils/constants/constants";
import {addNewCompany, removeExistingCompany} from "src/utils/redux/userSelectionReducer";
import {CHECKBOX, FORM_CONTROL_LABEL, FORM_GROUP, RIGHT_PANEL} from "src/utils/constants/dataTestIds";

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
        <RightPanel data-testid={RIGHT_PANEL}>
            <FormGroup data-testid={FORM_GROUP} sx={formGroupStyle}>
                {
                    responseData.map((e: string, i: number) => (
                        <FormControlLabel
                            data-testid={FORM_CONTROL_LABEL}
                            control={<Checkbox data-testid={CHECKBOX}/>}
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
