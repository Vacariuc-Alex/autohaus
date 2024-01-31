import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import React, {useState} from "react";
import {companies} from "../utils/dataProvider/Companies";
import RightPanel from "../utils/styledComponents/RightPanel";

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
        } else {
            setSelectedCompany("");
            companyProp("");
        }
    }

    const handleChecked = (index: number) => {
        return selectedCompany === companies[index];
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
                    companies.map((e: string, index: number) => (
                        <FormControlLabel control={<Checkbox/>}
                                          sx={{width: "200px"}}
                                          checked={handleChecked(index)}
                                          onChange={handleCompanyChange}
                                          value={companies[index]}
                                          label={companies[index]}/> //ToDo: Blocker, need to use multiple checkes (see: Home-> fetch)
                    ))
                }
            </FormGroup>
        </RightPanel>
    );
}

export default CompanyFilter;
