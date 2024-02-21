import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React, {BaseSyntheticEvent, useState} from "react";
import RightPanel from "../utils/styledComponents/RightPanel";
import {useSelector} from "react-redux";
import {RootState} from "../utils/redux/store";
import {createSelector} from "@reduxjs/toolkit";
import {Product} from "../utils/constants/constants";

type CompaniesFilterProps = {
    companiesProps: (e: string[]) => void
}

const CompanyFilter = (props: CompaniesFilterProps) => {

    const {companiesProps} = props;
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const selectorArg = (state: RootState) => state.productsStore.responseData;
    const selectorCombiner = (selector: Product[]) => {
        return Array.from(
            new Set(
                selector.map((e) => {
                    return e.company;
                })
            )
        ).sort();
    };
    const combinedSelector = createSelector(selectorArg, selectorCombiner);
    const selector = useSelector(combinedSelector);

    const appendNewCompany = (newCompany: string) => {
        if (!selectedCompanies.includes(newCompany)) {
            setSelectedCompanies(prev => {
                const updatedCompanies = [...prev, newCompany];
                companiesProps(updatedCompanies);
                return updatedCompanies;
            });
        }
    };

    const removeExistingCompany = (company: string) => {
        let index = selectedCompanies.indexOf(company);
        if (index !== -1) {
            selectedCompanies.splice(index, 1);
            setSelectedCompanies(prev => {
                const updatedCompanies = [...prev];
                companiesProps(updatedCompanies);
                return updatedCompanies;
            });
        }
    };

    const handleCompanyChange = (e: BaseSyntheticEvent) => {
        const state: boolean = e.target.checked;
        const value: string = e.target.value;

        if (state) {
            appendNewCompany(value);
        } else {
            removeExistingCompany(value);
        }
    }

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
                    selector.map((e: string, i: number) => (
                        <FormControlLabel
                            data-testid="form-control-label"
                            control={<Checkbox data-testid="checkbox"/>}
                            sx={{width: "200px"}}
                            onChange={handleCompanyChange}
                            value={selector[i]}
                            label={selector[i]}
                            key={i}
                        />
                    ))
                }
            </FormGroup>
        </RightPanel>
    );
}

export default CompanyFilter;
