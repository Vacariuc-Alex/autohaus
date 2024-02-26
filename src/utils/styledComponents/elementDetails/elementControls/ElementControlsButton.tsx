import styled from "styled-components";

type ElementControlsButtonProps = {
    backgroundColor: string;
}

export const ElementControlsButton = styled("button")<ElementControlsButtonProps>`
    color: #ffffff;
    background-color: ${(props) => props.backgroundColor};
    opacity: 80%;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    letter-spacing: 1px;
    padding: 12px;
    transition: 500ms;

    &:hover {
        opacity: 100%;
    }
`;
