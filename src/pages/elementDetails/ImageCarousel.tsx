import {NavigateBefore, NavigateNext} from "@mui/icons-material";
import React from "react";
import {Product} from "src/utils/constants/constants";
import {
    ImageCarouselStyledContainer
} from "src/utils/styledComponents/elementDetails/carousel/ImageCarouselStyledContainer";
import {IMG, PAGE} from "src/utils/constants/dataTestIds";
import {ImageStyledContainer} from "src/utils/styledComponents/elementDetails/carousel/ImageStyledContainer";
import {PaperStyledContainer} from "src/utils/styledComponents/elementDetails/carousel/PaperStyledContainer";
import noImage from "src/assets/img/NoImage.jpg";

type CarouselProps = {
    product: Product;
}

const ImageCarousel = (props: CarouselProps) => {
    const {product} = props;
    return (
        <ImageCarouselStyledContainer PrevIcon={<NavigateBefore/>} NextIcon={<NavigateNext/>}>
            {product && product.images && product.images.length > 0 ? (
                product.images.map((e, i) => {
                    return (
                        <PaperStyledContainer data-testid={PAGE} key={i} elevation={0}>
                            <ImageStyledContainer data-testid={IMG} src={e} alt="autoImg"/>
                        </PaperStyledContainer>
                    );
                })) : (
                    <PaperStyledContainer data-testid={PAGE} elevation={0}>
                        <ImageStyledContainer data-testid={IMG} src={noImage} alt="autoImg"/>
                    </PaperStyledContainer>
                )
            }
        </ImageCarouselStyledContainer>
    );
}

export default ImageCarousel;
