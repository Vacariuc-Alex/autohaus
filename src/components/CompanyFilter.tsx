import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React, {BaseSyntheticEvent, useState} from "react";
import {companies} from "../utils/dataProvider/Companies";
import RightPanel from "../utils/styledComponents/RightPanel";

type CompaniesFilterProps = {
    companiesProps: (e: string[]) => void
}

const CompanyFilter = (props: CompaniesFilterProps) => {

    const {companiesProps} = props;
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

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
        <RightPanel>
            <FormGroup sx={formGroupStyle}>
                {
                    companies.map((e: string, i: number) => (
                        <FormControlLabel control={<Checkbox/>}
                                          sx={{width: "200px"}}
                                          onChange={handleCompanyChange}
                                          value={companies[i]}
                                          label={companies[i]}
                                          key={i}/>
                    ))
                }
            </FormGroup>
        </RightPanel>
    );
}

export default CompanyFilter;
