import SearchIcon from "@mui/icons-material/Search";
import {SearchIconWrapper} from "src/utils/styledComponents/navbar/search/SearchIconWrapper";
import {StyledInputBase} from "src/utils/styledComponents/navbar/search/SearchInputBase";
import {Search} from "src/utils/styledComponents/navbar/search/Search";
import React, {BaseSyntheticEvent, useEffect, useState} from "react";
import {SEARCH, SEARCH_ICON, SEARCH_ICON_WRAPPER, STYLED_INPUT_BASE} from "src/utils/constants/dataTestIds";
import {EMPTY_STRING, Product} from "src/utils/constants/constants";

type SearchbarProps = {
    initialData: Product[];
    resultingData: (e: Product[]) => void;
}

const Searchbar = (props: SearchbarProps) => {

    const {initialData, resultingData} = props;
    const [searchingText, setSearchingText] = useState<string>(EMPTY_STRING);

    const searchAndFilterProducts = () => {
        const foundProducts = initialData.filter((e: Product) => {
            const productsSearchableText = `${e.company} ${e.model} ${e.color}`;
            const pattern = new RegExp(`.*${searchingText}.*`, "i");
            return pattern.test(productsSearchableText);
        });
        resultingData(foundProducts);
    }

    useEffect(() => {
        searchAndFilterProducts();
    }, [searchingText]);

    const handleSearchTextChange = (e: BaseSyntheticEvent) => {
        setSearchingText(e.target.value);
    }

    return (
        <Search data-testid={SEARCH}>
            <SearchIconWrapper data-testid={SEARCH_ICON_WRAPPER}>
                <SearchIcon data-testid={SEARCH_ICON} sx={{color: "#242a2e"}}/>
            </SearchIconWrapper>
            <StyledInputBase
                data-testid={STYLED_INPUT_BASE}
                placeholder="Search…"
                onChange={handleSearchTextChange}/>
        </Search>
    )
}

export default Searchbar;
