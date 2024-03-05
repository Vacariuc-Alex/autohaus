import styled from "styled-components";
import Carousel from "react-material-ui-carousel";

export const ImageCarouselStyledContainer = styled(Carousel)`
    display: inline-flex;
    flex-flow: wrap row;
    margin: 100px 100px 100px 21vw;
    width: 35vw;
    height: 78vh;

    @media screen and (min-width: 1900px) {
        margin-top: 150px;
    }
`;
