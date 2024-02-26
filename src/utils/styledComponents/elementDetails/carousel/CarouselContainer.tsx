import styled from "styled-components";
import Carousel from "react-material-ui-carousel";

export const ImageCarouselContainer = styled(Carousel)`
    display: inline-flex;
    flex-flow: wrap row;
    margin: 100px 100px 100px 21vw;
    width: 35vw;
    height: 100vh;

    @media screen and (min-width: 1900px) {
        margin-top: 150px;
        height: 70vh;
    }
`;
