import React, {BaseSyntheticEvent, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {FaCar} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import {SearchIconWrapper} from "../utils/styledComponents/search/SearchIconWrapper";
import {StyledInputBase} from "../utils/styledComponents/search/SearchInputBase";
import {Search} from '../utils/styledComponents/search/Search';
import {Product} from "../utils/constants/constants";

type NavbarProps = {
    initialData?: Product[];
    resultingData?: (e: Product[]) => void;
} | {
    initialData: Product[];
    resultingData: (e: Product[]) => void;
}

const pages = ["Home", "News", "Wishlist"];

const ResponsiveAppBar = (props: NavbarProps) => {

    const {initialData, resultingData} = props;

    const navigate = useNavigate();
    const [searchingText, setSearchingText] = useState<string>("");

    const searchAndFilterProducts = () => {
        if (!initialData) return;

        const foundProducts = initialData.filter((e: Product) => {
            const productsSearchableText = `${e.company} ${e.model} ${e.color}`;
            const pattern = new RegExp(`.*${searchingText}.*`, "i");
            return pattern.test(productsSearchableText);
        });

        if (resultingData) {
            resultingData(foundProducts);
        }
    }

    const handleOnClick = (page: string) => {
        navigate(`/${page.toLowerCase()}`);
    }

    const handleSearchTextChange = (e: BaseSyntheticEvent) => {
        setSearchingText(e.target.value);
    }

    useEffect(() => {
        searchAndFilterProducts();
    }, [searchingText]);

    return (
        <AppBar data-testid="app-bar" position="fixed" sx={{backgroundColor: "#2e8b5a"}}>
            <Container
                data-testid="container"
                maxWidth="xl"
                sx={{padding: {xs: 0, sm: 0, md: 0, lg: 0, xl: 0}, marginLeft: "105px"}}
            >
                <Toolbar data-testid="toolbar" disableGutters>
                    <FaCar
                        data-testid="fa-car-icon"
                        style={{display: 'flex', marginRight: 30, transform: "scale(1.5)"}}
                    />
                    <Typography
                        data-testid="typography"
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 7,
                            display: 'flex',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'default'
                        }}
                    >
                        Autohaus
                    </Typography>
                    <Box data-testid="box" sx={{flexGrow: 1, display: 'flex'}}>
                        {pages.map((page) => (
                            <Button
                                data-testid="button"
                                key={page}
                                sx={{
                                    margin: 2,
                                    color: 'white',
                                    display: 'block',
                                    letterSpacing: '.05rem',
                                    '&:hover': {
                                        backgroundColor: '#39a96f',
                                        outline: 'none'
                                    }
                                }}
                                onClick={() => handleOnClick(page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {initialData && resultingData &&
                        <Search data-testid="search">
                            <SearchIconWrapper data-testid="search-icon-wrapper">
                                <SearchIcon data-testid="search-icon" sx={{color: "#242a2e"}}/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                data-testid="styled-input-base"
                                placeholder="Search…"
                                onChange={handleSearchTextChange}/>
                        </Search>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
