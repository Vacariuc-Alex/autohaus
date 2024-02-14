import styled from "styled-components";
import {animated} from "react-spring";

export const NoItemContainer = styled(animated.div) `
    position: absolute;
    transform: translate(35%, 20%);
    box-shadow: 1px 1px 100px 100px #e5e5e5;
    background-color: #d3d3d3;
    border-radius: 10px;
    padding: 32px
`;
