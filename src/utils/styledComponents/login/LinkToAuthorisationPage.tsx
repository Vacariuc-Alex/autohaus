import styled from "styled-components";
import Link from "@mui/material/Link";

export const LinkToAuthorisationPage = styled(Link)`
    position: relative;
    top: 18px;
    text-align: left;

    &:hover {
        color: #0077ff;
        transition: color 300ms ease;
    };

    &:active {
        color: #ff7700;
    };
`;
