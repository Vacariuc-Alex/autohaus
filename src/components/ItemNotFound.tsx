import {Typography} from "@mui/material";
import React from "react";
import itemNotFound from "src/assets/img/ItemNotFound.png"
import {useSpring} from "react-spring";
import {NoItemContainer} from "src/utils/styledComponents/common/NoItemsContainer";
import {IMAGE, NO_ITEMS_CONTAINER, TYPOGRAPHY} from "src/utils/constants/dataTestIds";

const ItemNotFound = () => {

    const animationProps = useSpring({
        from: {opacity: 0},
        opacity: 1,
        config: {duration: 2000, delay: 5000},
    });

    return (
        <NoItemContainer data-testid={NO_ITEMS_CONTAINER} style={animationProps}>
            <img
                data-testid={IMAGE}
                src={itemNotFound}
                alt="Item not found"
                style={{width: 500, marginLeft: "calc((100% - 500px) / 2)"}}
            />
            <Typography data-testid={TYPOGRAPHY} variant="h5" gutterBottom sx={{marginTop: 3}}>
                This item currently doesn't exist in our stock!
            </Typography>
        </NoItemContainer>
    );
}

export default ItemNotFound;
