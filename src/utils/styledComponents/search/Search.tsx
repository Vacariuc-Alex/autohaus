import {alpha, styled} from "@mui/material/styles";

export const Search = styled("div")(({theme}) => ({
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    left: "70vw",
    minWidth: "21%",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}));
