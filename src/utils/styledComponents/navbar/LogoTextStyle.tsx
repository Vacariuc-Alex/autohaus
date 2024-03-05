import {ElementType} from "react";
import styled from "styled-components";
import {Typography, TypographyProps} from "@mui/material";

type LogoTextStyleProps = TypographyProps & {
    component?: ElementType<any, keyof JSX.IntrinsicElements> | undefined;
    href?: string | undefined;
};

export const LogoTextStyle = styled(Typography)<LogoTextStyleProps>`
    margin-right: 7px;
    display: flex;
    font-family: monospace;
    font-weight: 700;
    letter-spacing: .2rem;
    color: inherit;
    text-decoration: none;
    cursor: default;
`;
