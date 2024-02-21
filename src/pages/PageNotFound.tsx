import React from "react";
import {useSpring} from "react-spring";
import Navbar from "../components/Navbar";
import {Typography} from "@mui/material";
import {NotFoundContainer} from "../utils/styledComponents/NotFoundContainer";
import pageNotFoundImage from "../assets/img/PageNotFound.png"

const PageNotFound = () => {

    const animationProps = useSpring({
        opacity: 1,
        from: {opacity: 0},
        config: {duration: 2000},
    });

    return (
        <>
            <Navbar/>
            <NotFoundContainer data-testid="not-found-container" style={animationProps}>
                <Typography
                    data-testid="typography"
                    sx={{fontSize: "100px", color: "#c71919", letterSpacing: '.2rem', fontWeight: 700}}
                >
                    404
                </Typography>
                <Typography
                    data-testid="typography"
                    sx={{fontSize: "20px", fontWeight: "bolder", marginBottom: "10px"}}
                >
                    Page Not Found!
                </Typography>
                <Typography data-testid="typography" sx={{fontSize: "20px"}}>
                    Sorry, the page you're looking for does not exist!
                </Typography>
                <img src={pageNotFoundImage} style={{width: 120, marginTop: 20}} alt="Not found!"/>
            </NotFoundContainer>
        </>
    );
}

export default PageNotFound;
