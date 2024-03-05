import styled from "styled-components";
import {animated} from "react-spring";

export const NoItemContainer = styled(animated.div) `
    box-shadow: 1px 1px 100px 100px #e5e5e5;
    background-color: #d3d3d3;
    border-radius: 10px;
    padding: 32px;
    margin-bottom: 100px;

    transform: translate(14dvw, 7dvh);
    @media screen and (min-width: 1900px) {
        transform: translate(21dvw, 14dvh);
    }
`;
