import React from "react";
import {useSpring} from "react-spring";
import Navbar from "src/components/Navbar";
import {Typography} from "@mui/material";
import {PageNotFoundContainer} from "src/utils/styledComponents/PageNotFoundContainer";
import pageNotFoundImage from "src/assets/img/PageNotFound.png"
import {PAGE_NOT_FOUND_CONTAINER, TYPOGRAPHY} from "src/utils/constants/dataTestIds";

const PageNotFound = () => {

    const animationProps = useSpring({
        opacity: 1,
        from: {opacity: 0},
        config: {duration: 2000},
    });

    return (
        <>
            <Navbar/>
            <PageNotFoundContainer data-testid={PAGE_NOT_FOUND_CONTAINER} style={animationProps}>
                <Typography
                    data-testid={TYPOGRAPHY}
                    sx={{fontSize: "100px", color: "#c71919", letterSpacing: ".2rem", fontWeight: 700}}
                >
                    404
                </Typography>
                <Typography
                    data-testid={TYPOGRAPHY}
                    sx={{fontSize: "20px", fontWeight: "bolder", marginBottom: "10px"}}
                >
                    Page Not Found!
                </Typography>
                <Typography data-testid={TYPOGRAPHY} sx={{fontSize: "20px"}}>
                    Sorry, the page you're looking for does not exist!
                </Typography>
                <img src={pageNotFoundImage} style={{width: 120, marginTop: 20}} alt="Not found!"/>
            </PageNotFoundContainer>
        </>
    );
}

export default PageNotFound;
