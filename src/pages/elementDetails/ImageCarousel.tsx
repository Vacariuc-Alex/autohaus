import {NavigateBefore, NavigateNext} from "@mui/icons-material";
import React from "react";
import Paper from "@mui/material/Paper";
import {Product} from "src/utils/constants/constants";
import {ImageCarouselContainer} from "src/utils/styledComponents/elementDetails/carousel/CarouselContainer";
import {IMG, PAGE} from "src/utils/constants/dataTestIds";

type CarouselProps = {
    product: Product;
}

const ImageCarousel = (props: CarouselProps) => {
    const {product} = props;
    return (
        <ImageCarouselContainer
            navButtonsAlwaysVisible={true}
            PrevIcon={<NavigateBefore/>}
            NextIcon={<NavigateNext/>}
        >
            {product && product.images &&
                product.images.map((e, i) => {
                    return (
                        <Paper data-testid={PAGE} key={i}>
                            <img data-testid={IMG} src={e} alt="autoImg"/>
                        </Paper>
                    );
                })
            }
        </ImageCarouselContainer>
    );
}

export default ImageCarousel;
