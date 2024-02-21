import React from "react";
import {Typography, Box, CircularProgress} from "@mui/material";

const Loading = () => {
    return (
        <Box data-testid="box" style={{flex: "column", position: "absolute", left: "50%", bottom: "50%"}}>
            <CircularProgress data-testid="circular-progress" color="primary"/>
            <Typography data-testid="typography" sx={{margin: "15px -15px", fontSize: 20, fontWeight: "bold"}}>
                Loading ...
            </Typography>
        </Box>
    );
};

export default Loading;
