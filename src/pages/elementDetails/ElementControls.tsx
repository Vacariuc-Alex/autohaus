import React from "react";
import {
    ElementControlsContainer
} from "src/utils/styledComponents/elementDetails/elementControls/ElementControlsContainer";
import {ElementControlsButton} from "src/utils/styledComponents/elementDetails/elementControls/ElementControlsButton";
import {BUTTON, ELEMENT_CONTROLS_CONTAINER} from "src/utils/constants/dataTestIds";

type ElementControlsProps = {
    handleOnDeleteClick: () => void;
    handleOnUpdateClick: () => void;
}

const ElementControls = (props: ElementControlsProps) => {
    const {handleOnDeleteClick, handleOnUpdateClick} = props;
    return (
        <ElementControlsContainer data-testid={ELEMENT_CONTROLS_CONTAINER}>
            <ElementControlsButton
                data-testid={BUTTON}
                backgroundColor={"#ff0000"}
                onClick={handleOnDeleteClick}
            >
                DELETE
            </ElementControlsButton>
            <ElementControlsButton
                data-testid={BUTTON}
                backgroundColor={"#0033ff"}
                onClick={handleOnUpdateClick}
            >
                EDIT
            </ElementControlsButton>
        </ElementControlsContainer>
    );
}

export default ElementControls;
