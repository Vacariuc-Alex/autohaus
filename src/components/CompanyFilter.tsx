import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React, {useState} from "react";
import {companies} from "../utils/dataProvider/Companies";

type CompanyFilterProps = {
    companyProp: (e: string) => void
}

const CompanyFilter: React.FC<CompanyFilterProps> = ({companyProp}) => {

    const [selectedCompany, setSelectedCompany] = useState<string>("");

    const handleCompanyChange = (e: any) => {
        const state: boolean = e.target.checked;
        const value: string = e.target.value;

        if (state) {
            setSelectedCompany(value);
            companyProp(value);
        }
    }

    const handleChecked = (index: number) => {
        return selectedCompany === companies[index];
    }

    return (
        <FormGroup>
            {
                companies.map((e: string, index: number) => (
                    <FormControlLabel control={<Checkbox/>}
                                      checked={handleChecked(index)}
                                      onChange={handleCompanyChange}
                                      value={companies[index]}
                                      label={companies[index]}/> //ToDo: Blocker, need to use multiple checkes (see: Home-> fetch)
                ))
            }

        </FormGroup>
    );
}

export default CompanyFilter;
