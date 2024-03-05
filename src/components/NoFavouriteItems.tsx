import {Typography} from "@mui/material";
import React from "react";
import sadHeart from "src/assets/img/SadHeart.png"
import {useSpring} from "react-spring";
import {NoItemContainer} from "src/utils/styledComponents/common/NoItemsContainer";
import {
    IMG_CONTAINER,
    NO_ITEMS_CONTAINER,
    TYPOGRAPHY_HEADING_CONTAINER,
    TYPOGRAPHY_PARAGRAPH_CONTAINER
} from "src/utils/constants/dataTestIds";

const NoFavouriteItems = () => {

    const animationProps = useSpring({
        from: {opacity: 0},
        opacity: 1,
        config: {duration: 2000},
    });

    return (
        <NoItemContainer style={animationProps} data-testid={NO_ITEMS_CONTAINER}>
            <img
                data-testid={IMG_CONTAINER}
                src={sadHeart}
                alt="Sad Heart"
                style={{width: 300, marginLeft: "calc((100% - 300px) / 2)"}}/>
            <Typography data-testid={TYPOGRAPHY_HEADING_CONTAINER} variant="h3" gutterBottom>
                You don't have any favourite items!
            </Typography>
            <Typography data-testid={TYPOGRAPHY_PARAGRAPH_CONTAINER} sx={{mt: 2}}>
                You can add an item to favourite by clicking on the heart that shows up when you hover over the picture!
            </Typography>
        </NoItemContainer>
    );
}

export default NoFavouriteItems;
