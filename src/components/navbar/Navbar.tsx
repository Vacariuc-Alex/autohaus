import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {FaCar} from "react-icons/fa";
import {Product} from "src/utils/constants/constants";
import {
    APP_BAR,
    BOX,
    BUTTON,
    CONTAINER,
    FA_CAR_ICON,
    SEARCH,
    TOOLBAR,
    TYPOGRAPHY
} from "src/utils/constants/dataTestIds";
import Searchbar from "src/components/navbar/Searchbar";
import Pages from "src/components/navbar/Pages";
import AddProduct from "src/components/navbar/AddProduct";
import {LogoTextStyle} from "src/utils/styledComponents/navbar/LogoTextStyle";
import AvatarMenu from "src/components/navbar/AvatarMenu";

type NavbarProps = {
    initialData?: Product[];
    resultingData?: (e: Product[]) => void;
} | {
    initialData: Product[];
    resultingData: (e: Product[]) => void;
}

const ResponsiveAppBar = (props: NavbarProps) => {

    const {initialData, resultingData} = props;

    return (
        <AppBar data-testid={APP_BAR} position="fixed" sx={{backgroundColor: "#2e8b5a"}}>
            <Container
                data-testid={CONTAINER}
                maxWidth="xl"
                sx={{padding: {xs: 0, sm: 0, md: 0, lg: 0, xl: 0}, marginLeft: "105px"}}
            >
                <Toolbar data-testid={TOOLBAR} sx={{display: "flex"}} disableGutters>
                    <FaCar
                        data-testid={FA_CAR_ICON}
                        style={{display: "flex", marginRight: 30, transform: "scale(1.5)"}}
                    />
                    <LogoTextStyle
                        data-testid={TYPOGRAPHY}
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                    >
                        Autohaus
                    </LogoTextStyle>
                    <Box data-testid={BOX} sx={{flexGrow: 1, display: "flex", ml: 7}}>
                        <Pages data-testid={BUTTON}/>
                        {initialData && <AddProduct data-testid={BUTTON} initialData={initialData}/>}
                    </Box>
                    {initialData && resultingData &&
                        <Searchbar data-testid={SEARCH} initialData={initialData} resultingData={resultingData}/>
                    }
                    <AvatarMenu/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
