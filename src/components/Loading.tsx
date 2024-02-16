import React from "react";
import {Typography, Box, CircularProgress} from "@mui/material";

const Loading = () => {
    return (
        <Box style={{flex: "column", position: "absolute", left: "50%", bottom: "50%"}}>
            <CircularProgress color="primary"/>
            <Typography sx={{margin: "15px -15px", fontSize: 20, fontWeight: "bold"}}> Loading ... </Typography>
        </Box>
    );
};

export default Loading;
