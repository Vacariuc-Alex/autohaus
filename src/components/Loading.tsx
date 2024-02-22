import React from "react";
import {Box, CircularProgress, Typography} from "@mui/material";
import {BOX, CIRCULAR_PROGRESS, TYPOGRAPHY} from "src/utils/constants/dataTestIds";

const Loading = () => {
    return (
        <Box data-testid={BOX} style={{flex: "column", position: "absolute", left: "50%", bottom: "50%"}}>
            <CircularProgress data-testid={CIRCULAR_PROGRESS} color="primary"/>
            <Typography data-testid={TYPOGRAPHY} sx={{margin: "15px -15px", fontSize: 20, fontWeight: "bold"}}>
                Loading ...
            </Typography>
        </Box>
    );
};

export default Loading;
